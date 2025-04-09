import { Role } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { DeviceService } from '@modules/Device/device.service';
import { BorrowStatus, ReservationStatus } from '@core/enum/enum';

@Injectable()
export class ReservationService {
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
    return this.prisma.reservation.create({
      data: {
        ...createReservationDto,
        status: initialStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        user: true,
        device: { select: { deviceId: true } },
        lab: true,
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

    return this.prisma.reservation.findMany({
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

  async findOne(reservationId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { reservationId },
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
      throw new NotFoundException(`Reservation with ID ${reservationId} not found`);
    }
    return reservation;
  }

  async update(reservationId: string, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.findOne(reservationId);
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

    return this.prisma.reservation.update({
      where: { reservationId },
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
        lab: true,
        lecturer: {
          include: {
            user: true,
          }
        }
      },
    });
  }


  async remove(reservationId: string) {
    await this.findOne(reservationId);
    return this.prisma.reservation.delete({ where: { reservationId } });
  }

  async approveByLecturer(reservationId: string, lecturerId: string) {
    const lecturer = await this.prisma.lecturer.findUnique({ where: { lecturerId } });
    if (!lecturer) {
      throw new Error('Giảng viên không tồn tại.');
    }
    return this.prisma.reservation.update({
      where: { reservationId },
      data: {
        lecturerId,
        status: ReservationStatus.APPROVED_BY_LECTURER,
        updatedAt: new Date(),
      },
    });
  }

  async approveByAdmin(reservationId: string) {
    return this.prisma.reservation.update({
      where: { reservationId },
      data: {
        adminApproved: true,
        status: ReservationStatus.APPROVED,
        updatedAt: new Date(),
      },
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
}