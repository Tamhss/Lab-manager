import { Module } from '@nestjs/common';

import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { PrismaService } from '@core/global/prisma/prisma.service';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService, PrismaService],
})
export class DeviceModule { }
