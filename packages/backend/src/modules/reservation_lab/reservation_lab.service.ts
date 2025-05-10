import { Role } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { BorrowStatus, ReservationStatus } from '@core/enum/enum';
import { LabService } from '@modules/Lab/lab.service';
import { MailService } from '@modules/send_mail/mail.service';

@Injectable()
export class ReservationLabService {
  constructor(
    private prisma: PrismaService,
    private labService: LabService,
    private mailService: MailService
  ) { }

  private async generateCustomId(userId: string, labId: string): Promise<string> {
    const prefix = 'DLP';
    const shortUserId = userId.slice(0, 4);
    const shortLabId = labId ? labId.slice(0, 7) : 'NOLAB';
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const candidateId = `${prefix}-${shortUserId}-${shortLabId}-${random}`;

    const existing = await this.prisma.reservationLab.findUnique({
      where: { labReservationId: candidateId },
    });

    if (existing) {
      return this.generateCustomId(userId, labId);
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

    const labReservationId = await this.generateCustomId(
      createReservationDto.userId,
      createReservationDto.labId || 'NOLAB' // Xử lý trường hợp deviceId là undefined
    );

    return this.prisma.reservationLab.create({
      data: {
        labReservationId,
        ...createReservationDto,
        status: initialStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        user: true,
        lab: { select: {labId: true } },
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

    return this.prisma.reservationLab.findMany({
      where,
      include: {
        user: true,
        lab: true,
        lecturer: {
          include: {
            user: true,
          }
        }
      },
    });
  }

  async findOne(labReservationId: string) {
    const reservation = await this.prisma.reservationLab.findUnique({
      where: { labReservationId },
      include: {
        user: true,
        lab: true,
        lecturer: {
          include: {
            user: true,
          }
        }
      },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${labReservationId} not found`);
    }
    return reservation;
  }

  async update(labReservationId: string, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.findOne(labReservationId);
    let borrowStatus: BorrowStatus | undefined;
    const statusEnum = ReservationStatus[updateReservationDto.status as keyof typeof ReservationStatus];

    if (statusEnum === ReservationStatus.APPROVED) {
      if (updateReservationDto.actualBorrowTime && !updateReservationDto.actualReturnTime) {
        borrowStatus = BorrowStatus.BORROWED;
      } else if (updateReservationDto.actualReturnTime) {
        borrowStatus = BorrowStatus.COMPLETED;
      }

      if (borrowStatus) {
        await this.labService.update(reservation.lab.labId, {
          borrowStatus: { set: borrowStatus },
        });
      }
    }
    if (statusEnum === ReservationStatus.REJECTED) {
      await this.mailService.sendMail(
        reservation.user.email,
        'Yêu cầu đặt phòng bị từ chối',
        `Xin chào ${reservation.user.userName}, rất tiếc yêu cầu đặt phòng "${reservation.lab.labName}" của bạn đã bị từ chối.`,
      );
    }

    return this.prisma.reservationLab.update({
      where: { labReservationId },
      data: {
        ...updateReservationDto,
        status: statusEnum,
        actualBorrowTime: updateReservationDto.actualBorrowTime ? new Date(updateReservationDto.actualBorrowTime) : undefined,
        actualReturnTime: updateReservationDto.actualReturnTime ? new Date(updateReservationDto.actualReturnTime) : undefined,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        lab: true,
        lecturer: {
          include: {
            user: true,
          }
        }
      },
    });
  }


  async remove(labReservationId: string) {
    await this.findOne(labReservationId);
    return this.prisma.reservationLab.delete({ where: { labReservationId } });
  }

  async approveByLecturer(labReservationId: string, lecturerId: string) {
    const lecturer = await this.prisma.lecturer.findUnique({ where: { lecturerId } });
    if (!lecturer) {
      throw new Error('Giảng viên không tồn tại.');
    }
    const reservation = await this.prisma.reservationLab.update({
      where: { labReservationId },
      data: {
        lecturerId,
        status: ReservationStatus.APPROVED_BY_LECTURER,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        lab: true,
      }
    });
    const subject = 'Lịch đặt phòng đã được phê duyệt bởi giảng viên';
    const text = `Xin chào ${reservation.user.userName}, lịch đặt thiết bị "${reservation.lab.labName}" vào ${reservation.createdAt} đã được giảng viên phê duyệt.`;
    const html = `<p>Xin chào <strong>${reservation.user.userName}</strong>,</p>
      <p>Lịch đặt thiết bị <strong>${reservation.lab.labName}</strong> vào <strong>${reservation.createdAt}</strong> đã được giảng viên phê duyệt.</p>`;

    await this.mailService.sendMail(reservation.user.email, subject, text, html);

    return reservation;
  }

  async approveByAdmin(labReservationId: string) {
    const reservation = await this.prisma.reservationLab.update({
      where: { labReservationId },
      data: {
        adminApproved: true,
        status: ReservationStatus.APPROVED,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        lab: true,
        lecturer: {
          include: {
            user: true,
          }
        }
      },
    });
    const subject = 'Lịch đặt thiết bị đã được phê duyệt bởi admin';
    const text = `Xin chào ${reservation.user.userName}, lịch đặt thiết bị "${reservation.lab.labName}" vào ${reservation.createdAt} đã được admin phê duyệt.`;
    const html = `<p>Xin chào <strong>${reservation.user.userName}</strong>,</p>
      <p>Lịch đặt thiết bị <strong>${reservation.lab.labName}</strong> vào <strong>${reservation.createdAt}</strong> đã được admin phê duyệt.</p>`;

    await this.mailService.sendMail(reservation.user.email, subject, text, html);

    return reservation;
  }
}