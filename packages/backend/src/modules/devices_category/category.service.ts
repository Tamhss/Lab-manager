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
    async getById(categoryId: string) {
        return this.prisma.deviceCategory.findUnique({
            where: { categoryId },
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
    async update(categoryId: string, data: Prisma.DeviceCategoryUpdateInput) {
        return this.prisma.deviceCategory.update({
            where: { categoryId },
            data,
        });
    }

    // Xóa Server Device
    async delete(categoryId: string) {
        return this.prisma.deviceCategory.delete({
            where: { categoryId },
        });
    }
}
