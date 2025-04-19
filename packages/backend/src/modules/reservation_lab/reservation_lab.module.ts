import { forwardRef, Module } from '@nestjs/common';
import { ReservationLabService } from './reservation_lab.service';
import { ReservationLabController } from './reservation_lab.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { LabModule } from '@modules/Lab/lab.module';

@Module({
    imports: [forwardRef(() => LabModule)],
    controllers: [ReservationLabController],
    providers: [ReservationLabService, PrismaService],
})
export class ReservationLabModule { }
