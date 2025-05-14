import { Role } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { DeviceService } from '@modules/device/device.service';
import { BorrowStatus, ReservationStatus } from '@core/enum/enum';
import { MailService } from '@modules/send_mail/mail.service';

@Injectable()
export class ReservationDeviceService {
  constructor(
    private prisma: PrismaService,
    private deviceService: DeviceService,
    private mailService: MailService
  ) { }

  private async generateCustomId(userId: string, deviceId: string): Promise<string> {
    const prefix = 'DLTB';
    const shortUserId = userId.slice(0, 4);
    const shortDeviceId = deviceId ? deviceId.slice(0, 4) : 'NODEVICE';
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const candidateId = `${prefix}-${shortUserId}-${shortDeviceId}-${random}`;

    const existing = await this.prisma.reservationDevice.findUnique({
      where: { deviceReservationId: candidateId },
    });

    if (existing) {
      return this.generateCustomId(userId, deviceId);
    }

    return candidateId;
  }

  async create(createReservationDto: CreateReservationDto, role: Role) {
    let initialStatus = ReservationStatus.PENDING;
    if (role === 'LECTURER') {
      initialStatus = ReservationStatus.APPROVED_BY_LECTURER;
    } else if (role === 'ADMIN') {
      initialStatus = ReservationStatus.APPROVED;
    }

    const deviceReservationId = await this.generateCustomId(
      createReservationDto.userId,
      createReservationDto.deviceId || 'NODEVICE'
    );

    return this.prisma.reservationDevice.create({
      data: {
        deviceReservationId,
        ...createReservationDto,
        status: initialStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        user: true,
        lab: { select: { labId: true } },
        device: { select: { deviceId: true } },
        lecturer: {
          include: {
            user: true,
          }
        }
      },
    });
  }

  async findAll(filters: { status?: string | string[]; userId?: string }) {
    const where: any = {};
    if (filters.status) {
      where.status = Array.isArray(filters.status) ? { in: filters.status } : filters.status;
    }
    if (filters.userId) where.userId = filters.userId;

    return this.prisma.reservationDevice.findMany({
      where,
      include: {
        user: true,
        device: true,
        lab: true,
        lecturer: {
          include: {
            user: true,
          }
        }
      },
    });
  }

  async findOne(deviceReservationId: string) {
    const reservation = await this.prisma.reservationDevice.findUnique({
      where: { deviceReservationId },
      include: {
        user: true,
        device: true,
        lab: true,
        lecturer: {
          include: {
            user: true,
          }
        }
      },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${deviceReservationId} not found`);
    }
    return reservation;
  }

  async update(deviceReservationId: string, updateReservationDto: UpdateReservationDto, actorRole: Role) {
    const reservation = await this.findOne(deviceReservationId);
    let borrowStatus: BorrowStatus | undefined;
    const statusEnum = ReservationStatus[updateReservationDto.status as keyof typeof ReservationStatus];

    if (statusEnum === ReservationStatus.APPROVED) {
      if (updateReservationDto.actualBorrowTime && !updateReservationDto.actualReturnTime) {
        borrowStatus = BorrowStatus.BORROWED;
      } else if (updateReservationDto.actualReturnTime) {
        borrowStatus = BorrowStatus.COMPLETED;
      }

      if (borrowStatus) {
        await this.deviceService.update(reservation.device.deviceId, {
          borrowStatus: { set: borrowStatus },
        });
      }
    }

    const user = await this.prisma.user.findUnique({
      where: { userId: reservation.userId },
      select: { role: true },
    });
    const userRole = user?.role;

    if (statusEnum === ReservationStatus.REJECTED) {
      if (userRole === Role.STUDENT && actorRole !== Role.STUDENT) {
      // Gửi email nếu STUDENT bị LECTURER hoặc ADMIN từ chối
        await this.mailService.sendMail(
          reservation.user.email,
          'Yêu cầu đặt phòng bị từ chối',
          `Xin chào ${reservation.user.userName}, rất tiếc yêu cầu đặt phòng "${reservation.lab.labName}" của bạn đã bị từ chối.`,
        );
      } else if (userRole !== Role.STUDENT) {
        // Gửi email nếu người dùng không phải STUDENT (LECTURER, ADMIN, v.v.)
        await this.mailService.sendMail(
          reservation.user.email,
          'Yêu cầu đặt phòng bị từ chối',
          `Xin chào ${reservation.user.userName}, rất tiếc yêu cầu đặt phòng "${reservation.lab.labName}" của bạn đã bị từ chối.`,
        );
      }
      // Không gửi email nếu STUDENT tự hủy (userRole === Role.STUDENT && actorRole === Role.STUDENT)
    }

    return this.prisma.reservationDevice.update({
      where: { deviceReservationId },
      data: {
        ...updateReservationDto,
        status: statusEnum,
        actualBorrowTime: updateReservationDto.actualBorrowTime ? new Date(updateReservationDto.actualBorrowTime) : undefined,
        actualReturnTime: updateReservationDto.actualReturnTime ? new Date(updateReservationDto.actualReturnTime) : undefined,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        device: true,
        lecturer: {
          include: {
            user: true,
          }
        }
      },
    });
  }


  async remove(deviceReservationId: string) {
    await this.findOne(deviceReservationId);
    return this.prisma.reservationDevice.delete({ where: { deviceReservationId } });
  }

  async approveByLecturer(deviceReservationId: string, lecturerId: string) {
    const lecturer = await this.prisma.lecturer.findUnique({ where: { lecturerId } });
    if (!lecturer) {
      throw new Error('Giảng viên không tồn tại.');
    }

    const reservation = await this.prisma.reservationDevice.update({
      where: { deviceReservationId },
      data: {
        lecturerId,
        status: ReservationStatus.APPROVED_BY_LECTURER,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        device: true,
      },
    });
    const subject = 'Lịch đặt thiết bị đã được phê duyệt bởi giảng viên';
    const text = `Xin chào ${reservation.user.userName}, lịch đặt thiết bị "${reservation.device.deviceName}" vào ${reservation.createdAt} đã được giảng viên phê duyệt.`;
    const html = `<p>Xin chào <strong>${reservation.user.userName}</strong>,</p>
      <p>Lịch đặt thiết bị <strong>${reservation.device.deviceName}</strong> vào <strong>${reservation.createdAt}</strong> đã được giảng viên phê duyệt.</p>`;

    await this.mailService.sendMail(reservation.user.email, subject, text, html);

    return reservation;
  }

  async approveByAdmin(deviceReservationId: string) {
    const reservation = await this.prisma.reservationDevice.update({
      where: { deviceReservationId },
      data: {
        adminApproved: true,
        status: ReservationStatus.APPROVED,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        lab: true,
        device: true,
        lecturer: {
          include: {
            user: true,
          },
        },
      },
    });

    const subject = 'Lịch đặt thiết bị đã được phê duyệt bởi admin';
    const text = `Xin chào ${reservation.user.userName}, lịch đặt thiết bị "${reservation.device.deviceName}" vào ${reservation.createdAt} đã được admin phê duyệt.`;
    const html = `<p>Xin chào <strong>${reservation.user.userName}</strong>,</p>
      <p>Lịch đặt thiết bị <strong>${reservation.device.deviceName}</strong> vào <strong>${reservation.createdAt}</strong> đã được <span style="color:green">admin phê duyệt</span>.</p>`;

    await this.mailService.sendMail(reservation.user.email, subject, text, html);

    return reservation;
  }
}
