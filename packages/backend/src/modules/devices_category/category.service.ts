import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeviceCategoryService {
    constructor(private prisma: PrismaService) { }

    // Lấy danh sách Server Devices
    async getAll() {
        return this.prisma.deviceCategory.findMany({
            include: { devices: true },
        });
    }

    // Lấy một Server Device theo ID
    async getById(id: string) {
        return this.prisma.deviceCategory.findUnique({
            where: { id },
            include: { devices: true },
        });
    }

    // Tạo mới Server Device
    async create(data: Prisma.DeviceCategoryCreateInput) {
        return this.prisma.deviceCategory.create({
            data,
        });
    }

    // Cập nhật Server Device
    async update(id: string, data: Prisma.DeviceCategoryUpdateInput) {
        return this.prisma.deviceCategory.update({
            where: { id },
            data,
        });
    }

    // Xóa Server Device
    async delete(id: string) {
        return this.prisma.deviceCategory.delete({
            where: { id },
        });
    }
}
