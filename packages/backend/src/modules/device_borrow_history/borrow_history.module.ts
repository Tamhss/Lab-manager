import { Module } from '@nestjs/common';
import { BorrowHistoryService } from './borrow_history.service';
import { BorrowHistoryController } from './borrow_history.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';

@Module({
  controllers: [BorrowHistoryController],
  providers: [BorrowHistoryService, PrismaService],
})
export class DeviceBorrowHistoryModule {}
