import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeviceCategoryService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        return this.prisma.deviceCategory.findMany({
            include: { devices: true, lab: true },
        });
    }

    async getByLab(labId: string) {
        const lab = await this.prisma.lab.findUnique({ where: { labId } });
        if (!lab) {
            throw new NotFoundException(`Lab with ID ${labId} not found`);
        }

        const categories = await this.prisma.deviceCategory.findMany({
            where: { labId },
            include: { devices: true },
        });
        return categories;
    }

    async getById(categoryId: string) {
        const category = await this.prisma.deviceCategory.findUnique({
            where: { categoryId },
            include: { devices: true, lab: true },
        });
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }
        return category;
    }

    async create(data: Prisma.DeviceCategoryCreateInput) {
        return this.prisma.deviceCategory.create({
            data,
        });
    }

    async update(categoryId: string, data: Prisma.DeviceCategoryUpdateInput) {
        const category = await this.prisma.deviceCategory.findUnique({
            where: { categoryId },
        });
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }
        return this.prisma.deviceCategory.update({
            where: { categoryId },
            data,
            include: { devices: true },
        });
    }

    async delete(categoryId: string) {
        const category = await this.prisma.deviceCategory.findUnique({
            where: { categoryId },
            include: { devices: true },
        });
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }
        if (category.devices.length > 0) {
            throw new ConflictException('Cannot delete category with associated devices');
        }
        return this.prisma.deviceCategory.delete({
            where: { categoryId },
        });
    }
}
