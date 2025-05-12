import { Module } from '@nestjs/common';
import { LabUsageService } from './lab_usage.service';
import { LabUsageController } from './lab_usage.controller';

@Module({
  controllers: [LabUsageController],
  providers: [LabUsageService],
})
export class LabUsageModule {}
