import { Injectable } from '@nestjs/common';

import { PrismaService } from '@core/global/prisma/prisma.service';
import { IPaginationResponse } from '@core/interface';
import { returnPagingData } from '@helper/utils';

import { VCreateDeviceDto } from './dto/createDevice.dto';
import { VUpdateDeviceDto } from './dto/updateDevice.dto';
import { TypeFile } from '@core/enum/default.enum';
import { Device } from '@prisma/client';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) { }

  async createDevice(createDeviceDto: VCreateDeviceDto): Promise<Device> {
    return this.prisma.device.create({
      data: createDeviceDto,
    });
  }

  async getAllDevices(): Promise<Device[]> {
    return this.prisma.device.findMany();
  }

  async getDeviceById(id: string): Promise<Device | null> {
    return this.prisma.device.findUnique({
      where: { id },
    });
  }

  async updateDevice(id: string, updateDeviceDto: VUpdateDeviceDto): Promise<Device> {
    return this.prisma.device.update({
      where: { id },
      data: updateDeviceDto,
    });
  }

  async deleteDevice(id: string): Promise<Device> {
    return this.prisma.device.delete({
      where: { id },
    });
  }
}
