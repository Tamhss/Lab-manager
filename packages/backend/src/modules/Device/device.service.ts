import { Injectable, NotFoundException } from '@nestjs/common';
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
    async getById(deviceId: string) {
        return this.prisma.device.findUnique({
            where: { deviceId },
            include: { category: true },
        });
    }

    // Tạo mới  Device
    async create(data: Prisma.DeviceCreateInput) {
        return this.prisma.$transaction(async (prisma) => {
            // Thêm thiết bị mới
            const newDevice = await prisma.device.create({
                data,
                include: { category: true },
            });

            // Cập nhật số lượng trong DeviceCategory
            await prisma.deviceCategory.update({
                where: { categoryId: newDevice.categoryId }, // Lấy ID từ device vừa tạo
                data: {
                    quantity: { increment: 1 }, // Tăng số lượng lên 1
                },
            });

            return newDevice;
        });
    }



    async update(deviceId: string, data: Prisma.DeviceUpdateInput) {
        const device = await this.prisma.device.findUnique({
            where: { deviceId },
        });

        if (!device) {
            throw new NotFoundException(`Device with ID ${deviceId} not found`);
        }

        return this.prisma.device.update({
            where: { deviceId },
            data,
        });
    }

    async delete(deviceId: string) {
        return this.prisma.$transaction(async (prisma) => {
            const device = await prisma.device.findUnique({
                where: { deviceId },
                select: { categoryId: true },
            });

            if (!device) throw new Error('Device not found');

            await prisma.device.delete({ where: { deviceId } });

            await prisma.deviceCategory.update({
                where: { categoryId: device.categoryId },
                data: {
                    quantity: { decrement: 1 },
                },
            });
        });
    }


}
