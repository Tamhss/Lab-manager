import { Module } from '@nestjs/common';
import { ServerDeviceService } from './server.service';
import { ServerDeviceController } from './server.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';

@Module({
    controllers: [ServerDeviceController],
    providers: [ServerDeviceService, PrismaService],
})
export class ServerDeviceModule { }
