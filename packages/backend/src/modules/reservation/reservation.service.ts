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

  async findOne(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
        device: true,
        lab: true,
        lecturer: true,
      },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    await this.findOne(id); // Kiểm tra tồn tại
    return this.prisma.reservation.update({
      where: { id },
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

  async remove(id: string) {
    await this.findOne(id); // Kiểm tra tồn tại
    return this.prisma.reservation.delete({
      where: { id },
    });
  }

  async approveByLecturer(id: string, lecturerId: string) {
    await this.findOne(id); // Kiểm tra tồn tại
    return this.prisma.reservation.update({
      where: { id },
      data: {
        lecturerId,
        status: 'APPROVED_BY_LECTURER',
        updatedAt: new Date(),
      },
    });
  }

  async approveByAdmin(id: string) {
    await this.findOne(id); // Kiểm tra tồn tại
    return this.prisma.reservation.update({
      where: { id },
      data: {
        adminApproved: true,
        status: 'APPROVED',
        updatedAt: new Date(),
      },
    });
  }
}