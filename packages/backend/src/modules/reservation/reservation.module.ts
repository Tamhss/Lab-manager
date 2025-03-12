import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { AuthModule } from '@core/global/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [AuthModule],
    controllers: [ReservationController],
    providers: [ReservationService, PrismaService],
})
export class ReservationModule { }
