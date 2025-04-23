import { Role } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { BorrowStatus, ReservationStatus } from '@core/enum/enum';
import { LabService } from '@modules/Lab/lab.service';

@Injectable()
export class ReservationLabService {
  constructor(
    private prisma: PrismaService,
    private labService: LabService
  ) { }

  async create(createReservationDto: CreateReservationDto, role: Role) {
    let initialStatus = ReservationStatus.PENDING;
    if (role === 'LECTURER') {
      initialStatus = ReservationStatus.APPROVED_BY_LECTURER;
    } else if (role === 'ADMIN') {
      initialStatus = ReservationStatus.APPROVED;
    }
    return this.prisma.reservationLab.create({
      data: {
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
    return this.prisma.reservationLab.update({
      where: { labReservationId },
      data: {
        lecturerId,
        status: ReservationStatus.APPROVED_BY_LECTURER,
        updatedAt: new Date(),
      },
    });
  }

  async approveByAdmin(labReservationId: string) {
    return this.prisma.reservationLab.update({
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
  }
}