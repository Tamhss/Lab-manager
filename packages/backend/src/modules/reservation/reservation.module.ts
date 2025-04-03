import { forwardRef, Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { DeviceService } from '@modules/Device/device.service';
import { DeviceModule } from '@modules/Device/device.module';

@Module({
    imports: [forwardRef(() => DeviceModule)], // Import DeviceModule
    controllers: [ReservationController],
    providers: [ReservationService, PrismaService, DeviceService],
})
export class ReservationModule { }
