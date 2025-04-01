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


    // Cập nhật  Device
    async update(deviceId: string, data: Prisma.DeviceUpdateInput) {
        return this.prisma.device.update({
            where: { deviceId },
            data,
            include: { category: true },
        });
    }

    // Xóa  Device
    async delete(deviceId: string) {
        return this.prisma.$transaction(async (prisma) => {
            // Lấy thiết bị cần xóa (để biết nó thuộc category nào)
            const device = await prisma.device.findUnique({
                where: { deviceId },
                select: { categoryId: true },
            });

            if (!device) throw new Error('Device not found');

            // Xóa thiết bị
            await prisma.device.delete({ where: { deviceId } });

            // Giảm số lượng trong DeviceCategory
            await prisma.deviceCategory.update({
                where: { categoryId: device.categoryId },
                data: {
                    quantity: { decrement: 1 }, // Giảm số lượng đi 1
                },
            });
        });
    }


}
