import { Module, forwardRef } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { ReservationDeviceModule } from '@modules/reservation_device/reservation_device.module';


@Module({
    imports: [forwardRef(() => ReservationDeviceModule)],
    controllers: [DeviceController],
    providers: [DeviceService, PrismaService],
    exports: [DeviceService],
})
export class DeviceModule { }
