import { Body, Injectable, NotFoundException, Post } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateDeviceDto } from './dto/create_device_dto';

@Injectable()
export class DeviceService {
    constructor(private prisma: PrismaService) { }
    
    async getAll() {
        return this.prisma.device.findMany({
            include: { category: { include: { lab: true } } }, 
        });
    }

    async getDevicesByLab(labId: string) {
        const lab = await this.prisma.lab.findUnique({ where: { labId } });
        if (!lab) {
            throw new NotFoundException(`Lab with ID ${labId} not found`);
        }
        return this.prisma.device.findMany({
            where: { category: { labId } },
            include: { category: { include: { lab: true } } },
        });
    }

    async getDevicesByCategory(categoryId: string) {
        const category = await this.prisma.deviceCategory.findUnique({
            where: { categoryId },
        });
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }
        return this.prisma.device.findMany({
            where: { categoryId },
            include: { category: { include: { lab: true } } },
        });
    }
 
    async getById(deviceId: string) {
        const device = await this.prisma.device.findUnique({
            where: { deviceId },
            include: { category: { include: { lab: true } } },
        });
        if (!device) {
            throw new NotFoundException(`Device with ID ${deviceId} not found`);
        }
        return device;
    }
 
    async create(data: CreateDeviceDto) {
        const category = await this.prisma.deviceCategory.findUnique({
          where: { categoryId: data.categoryId },
        });
        if (!category) {
          throw new NotFoundException(`Danh mục với ID ${data.categoryId} không tồn tại`);
        }
    
        return this.prisma.$transaction(async (prisma) => {
          const newDevice = await prisma.device.create({
            data: {
              deviceId: data.deviceId,
              deviceName: data.deviceName,
              description: data.description,
              status: data.status,
              category: {
                connect: { categoryId: data.categoryId },
              },
            },
            include: { category: true },
          });
    
          await prisma.deviceCategory.update({
            where: { categoryId: newDevice.categoryId },
            data: { quantity: { increment: 1 } },
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
            include: { category: true },
        });
    }

    async delete(deviceId: string) {
        return this.prisma.$transaction(async (prisma) => {
            const device = await prisma.device.findUnique({
                where: { deviceId },
                select: { categoryId: true },
            });
            if (!device) {
                throw new NotFoundException(`Device with ID ${deviceId} not found`);
            }

            await prisma.device.delete({ where: { deviceId } });

            await prisma.deviceCategory.update({
                where: { categoryId: device.categoryId },
                data: { quantity: { decrement: 1 } },
            });

            return { message: `Device with ID ${deviceId} deleted` };
        });
    }
}