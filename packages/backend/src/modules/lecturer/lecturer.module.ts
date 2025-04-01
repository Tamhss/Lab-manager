// src/lecturers/lecturer.module.ts
import { Module } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { LecturerController } from './lecturer.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';
@Module({
  controllers: [LecturerController],
  providers: [LecturerService, PrismaService],
})
export class LecturerModule {}