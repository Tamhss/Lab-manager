import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServerDeviceService {
    constructor(private prisma: PrismaService) { }

    // Lấy danh sách Server Devices
    async getAll() {
        return this.prisma.serverDevice.findMany({
            include: { device: true },
        });
    }

    // Lấy một Server Device theo ID
    async getById(id: string) {
        return this.prisma.serverDevice.findUnique({
            where: { id },
            include: { device: true },
        });
    }

    // Tạo mới Server Device
    async create(data: Prisma.ServerDeviceCreateInput) {
        return this.prisma.serverDevice.create({
            data,
        });
    }

    // Cập nhật Server Device
    async update(id: string, data: Prisma.ServerDeviceUpdateInput) {
        return this.prisma.serverDevice.update({
            where: { id },
            data,
        });
    }

    // Xóa Server Device
    async delete(id: string) {
        return this.prisma.serverDevice.delete({
            where: { id },
        });
    }
}
