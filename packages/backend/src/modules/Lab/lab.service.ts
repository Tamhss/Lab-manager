import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LabService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        return this.prisma.lab.findMany();
    }

    async getById(labId: string) {
        return this.prisma.lab.findUnique({
            where: { labId },
        });
    }

    async create(data: Prisma.LabCreateInput) {
        return this.prisma.$transaction(async (prisma) => {
            const newLab = await prisma.lab.create({
                data,
            });
            return newLab;
        });
    }

    async update(labId: string, data: Prisma.LabUpdateInput) {
        const lab = await this.prisma.lab.findUnique({
            where: { labId },
        });

        if (!lab) {
            throw new NotFoundException(`Device with ID ${labId} not found`);
        }

        return this.prisma.lab.update({
            where: { labId },
            data,
        });
    }

    async delete(labId: string) {
        return this.prisma.$transaction(async (prisma) => {
            const lab = await prisma.lab.findUnique({
                where: { labId },
            });

            if (!lab) throw new Error('Device not found');

            await prisma.lab.delete({ where: { labId } });
        });
    }
}
