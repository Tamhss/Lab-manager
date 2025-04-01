import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    return this.prisma.reservation.create({
      data: {
        ...createReservationDto,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        user: true,
        device: true,
        lab: true,
        lecturer: true,
      },
    });
  }

  async findAll(filters: { status?: string; userId?: string }) {
    const where: any = {};
    if (filters.status) where.status = filters.status;
    if (filters.userId) where.userId = filters.userId;

    return this.prisma.reservation.findMany({
      where,
      include: {
        user: true,
        device: true,
        lab: true,
        lecturer: true,
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
        lecturer: true,
      },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with reservationID ${reservationId} not found`);
    }
    return reservation;
  }

  async update(reservationId: string, updateReservationDto: UpdateReservationDto) {
    await this.findOne(reservationId); // Kiểm tra tồn tại
    return this.prisma.reservation.update({
      where: { reservationId },
      data: {
        ...updateReservationDto,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        device: true,
        lab: true,
        lecturer: true,
      },
    });
  }

  async remove(reservationId: string) {
    await this.findOne(reservationId); // Kiểm tra tồn tại
    return this.prisma.reservation.delete({
      where: { reservationId },
    });
  }

  async approveByLecturer(reservationId: string, lecturerId: string) {
    await this.findOne(reservationId); // Kiểm tra tồn tại
    return this.prisma.reservation.update({
      where: { reservationId },
      data: {
        lecturerId,
        status: 'APPROVED_BY_LECTURER',
        updatedAt: new Date(),
      },
    });
  }

  async approveByAdmin(reservationId: string) {
    await this.findOne(reservationId); // Kiểm tra tồn tại
    return this.prisma.reservation.update({
      where: { reservationId },
      data: {
        adminApproved: true,
        status: 'APPROVED',
        updatedAt: new Date(),
      },
    });
  }
}