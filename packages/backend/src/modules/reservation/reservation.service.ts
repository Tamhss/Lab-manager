import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation';
import { ReservationStatus, Role } from '@prisma/client';
import { UpdateReservationDto } from './dto/update-reservation';

@Injectable()
export class ReservationService {
    constructor(private prisma: PrismaService) { }

    async createReservation(dto: CreateReservationDto, userId: string) {
        const { deviceId, startTime, endTime } = dto;

        if (!deviceId) {
            throw new BadRequestException("Phải chọn thiết bị để đặt");
        }

        if (new Date(startTime) >= new Date(endTime)) {
            throw new BadRequestException("Thời gian kết thúc phải sau thời gian bắt đầu");
        }

        await this.checkTimeConflict(deviceId, new Date(startTime), new Date(endTime));

        return this.prisma.reservation.create({
            data: {
                userId,
                deviceId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                status: ReservationStatus.PENDING,
            },
            include: { device: true },
        });
    }

    async getAllReservations() {
        return this.prisma.reservation.findMany({
            include: { user: true, device: true },
        });
    }

    async getReservationById(id: string) {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
            include: { user: true, device: true },
        });

        if (!reservation) throw new NotFoundException('Không tìm thấy đặt lịch');
        return reservation;
    }

    async updateReservation(id: string, updateReservationDto: UpdateReservationDto) {
        return this.prisma.reservation.update({
            where: { id },
            data: updateReservationDto,
        });
    }

    async deleteReservation(id: string) {
        return this.prisma.reservation.delete({
            where: { id },
        });
    }

    async cancelReservation(id: string, userId: string, userRole: Role) {
        if (!Object.values(Role).includes(userRole)) {
            throw new BadRequestException("Vai trò không hợp lệ");
        }

        const reservation = await this.prisma.reservation.findUnique({ where: { id } });
        if (!reservation) throw new NotFoundException('Không tìm thấy đặt lịch');

        if (reservation.userId !== userId && userRole !== Role.ADMIN) {
            throw new ForbiddenException('Bạn không có quyền hủy lịch này');
        }

        return this.prisma.reservation.update({
            where: { id },
            data: { status: ReservationStatus.REJECTED },
        });
    }

    async updateReservationStatus(id: string, status: ReservationStatus) {
        const reservation = await this.prisma.reservation.findUnique({ where: { id } });
        if (!reservation) throw new NotFoundException("Không tìm thấy đặt lịch");

        const updatedReservation = await this.prisma.reservation.update({
            where: { id },
            data: { status },
        });

        if (status === "APPROVED") {
            await this.prisma.device.update({ where: { id: reservation.deviceId }, data: { status: "IN_USE" } });
        }

        if (status === "COMPLETED") {
            await this.prisma.device.update({ where: { id: reservation.deviceId }, data: { status: "AVAILABLE" } });
        }

        return updatedReservation;
    }

    async checkTimeConflict(deviceId: string, startTime: Date, endTime: Date) {
        const conflict = await this.prisma.reservation.findFirst({
            where: {
                deviceId,
                startTime: { lt: endTime },
                endTime: { gt: startTime },
                status: { in: ["PENDING", "APPROVED"] } // Chỉ kiểm tra nếu chưa hoàn thành
            }
        });

        if (conflict) {
            throw new ConflictException("Thiết bị đã được đặt trong khoảng thời gian này");
        }
    }

    async getAvailability(deviceId: string) {
        const device = await this.prisma.device.findUnique({ where: { id: deviceId } });
        if (!device) throw new NotFoundException("Không tìm thấy thiết bị");
        return { available: device.status === "AVAILABLE" };
    }
}