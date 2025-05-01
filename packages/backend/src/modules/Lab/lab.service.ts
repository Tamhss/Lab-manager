import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LabService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        return this.prisma.lab.findMany({
            include: {
                deviceCategories: {
                    include: { devices: true },
                },
            },
        });
    }

    async getById(labId: string) {
        const lab = await this.prisma.lab.findUnique({
            where: { labId },
          include: {
              deviceCategories: {
                  include: { devices: true },
              },
          },
      });
        if (!lab) {
            throw new NotFoundException(`Lab with ID ${labId} not found`);
        }
        return lab;
    }

    async create(data: Prisma.LabCreateInput) {
        return this.prisma.lab.create({
            data,
        });
    }

    async update(labId: string, data: Prisma.LabUpdateInput) {
        const lab = await this.prisma.lab.findUnique({
            where: { labId },
        });
        if (!lab) {
          throw new NotFoundException(`Lab with ID ${labId} not found`);
      }
        return this.prisma.lab.update({
            where: { labId },
            data,
        });
    }

    async delete(labId: string) {
        const lab = await this.prisma.lab.findUnique({
            where: { labId },
          include: { deviceCategories: true },
      });
        if (!lab) {
            throw new NotFoundException(`Lab with ID ${labId} not found`);
        }
        if (lab.deviceCategories.length > 0) {
            throw new ConflictException('Cannot delete lab with associated device categories');
        }
        return this.prisma.lab.delete({
            where: { labId },
        });
    }
}