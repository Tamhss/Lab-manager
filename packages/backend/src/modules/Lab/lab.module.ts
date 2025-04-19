import { Module, forwardRef } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { ReservationLabModule } from '@modules/reservation_lab/reservation_lab.module';


@Module({
    imports: [forwardRef(() => ReservationLabModule)],
    controllers: [LabController],
    providers: [LabService, PrismaService],
    exports: [LabService],
})
export class LabModule { }
