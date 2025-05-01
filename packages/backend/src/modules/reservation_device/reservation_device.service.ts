import { Role } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { DeviceService } from '@modules/device/device.service';
import { BorrowStatus, ReservationStatus } from '@core/enum/enum';

@Injectable()
export class ReservationDeviceService {
  constructor(
    private prisma: PrismaService,
    private deviceService: DeviceService
  ) { }

  async create(createReservationDto: CreateReservationDto, role: Role) {
    let initialStatus = ReservationStatus.PENDING;
    if (role === 'LECTURER') {
      initialStatus = ReservationStatus.APPROVED_BY_LECTURER;
    } else if (role === 'ADMIN') {
      initialStatus = ReservationStatus.APPROVED;
    }
    return this.prisma.reservationDevice.create({
      data: {
        ...createReservationDto,
        status: initialStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        user: true,
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

  async update(deviceReservationId: string, updateReservationDto: UpdateReservationDto) {
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
    return this.prisma.reservationDevice.update({
      where: { deviceReservationId },
      data: {
        lecturerId,
        status: ReservationStatus.APPROVED_BY_LECTURER,
        updatedAt: new Date(),
      },
    });
  }

  async approveByAdmin(deviceReservationId: string) {
    return this.prisma.reservationDevice.update({
      where: { deviceReservationId },
      data: {
        adminApproved: true,
        status: ReservationStatus.APPROVED,
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
}