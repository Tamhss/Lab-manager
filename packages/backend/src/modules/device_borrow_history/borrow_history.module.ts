import { Module } from '@nestjs/common';
import { DeviceBorrowHistoryService } from './borrow_history.service';
import { DeviceBorrowHistoryController } from './borrow_history.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';

@Module({
  controllers: [DeviceBorrowHistoryController],
  providers: [DeviceBorrowHistoryService, PrismaService],
})
export class DeviceBorrowHistoryModule {}
