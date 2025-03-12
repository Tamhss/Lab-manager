import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeviceService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        return this.prisma.device.findMany({
            include: { category: true },
        });
    }

    // Lấy một  Device theo ID
    async getById(id: string) {
        return this.prisma.device.findUnique({
            where: { id },
            include: { category: true },
        });
    }

    // Tạo mới  Device
    async create(data: Prisma.DeviceCreateInput) {
        return this.prisma.device.create({
            data,
            include: { category: true },
        });
    }

    // Cập nhật  Device
    async update(id: string, data: Prisma.DeviceUpdateInput) {
        return this.prisma.device.update({
            where: { id },
            data,
            include: { category: true },
        });
    }

    // Xóa  Device
    async delete(id: string) {
        return this.prisma.device.delete({
            where: { id },
        });
    }

}
