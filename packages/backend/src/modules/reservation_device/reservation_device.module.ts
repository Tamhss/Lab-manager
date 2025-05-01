import { forwardRef, Module } from '@nestjs/common';
import { ReservationDeviceService } from './reservation_device.service';
import { ReservationDeviceController } from './reservation_device.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { DeviceService } from '@modules/device/device.service';
import { DeviceModule } from '@modules/device/device.module';

@Module({
    imports: [forwardRef(() => DeviceModule)],
    controllers: [ReservationDeviceController],
    providers: [ReservationDeviceService, PrismaService, DeviceService],
})
export class ReservationDeviceModule { }
