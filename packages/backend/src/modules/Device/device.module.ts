import { Module, forwardRef } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { ReservationModule } from '@modules/reservation/reservation.module';


@Module({
    imports: [forwardRef(() => ReservationModule)], // Sử dụng forwardRef
    controllers: [DeviceController],
    providers: [DeviceService, PrismaService],
    exports: [DeviceService],
})
export class DeviceModule { }
