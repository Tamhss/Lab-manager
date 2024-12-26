import { Global, Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleModule } from '@nestjs/schedule';
@Global()
@Module({
  providers: [ScheduleService],
  exports: [ScheduleService],
  imports: [ScheduleModule.forRoot()],
})
export class CronjobModule {}
