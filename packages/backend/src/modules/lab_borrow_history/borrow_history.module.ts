import { Module } from '@nestjs/common';
import { LabBorrowHistoryService } from './borrow_history.service';
import { LabBorrowHistoryController } from './borrow_history.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';

@Module({
  controllers: [LabBorrowHistoryController],
  providers: [LabBorrowHistoryService, PrismaService],
})
export class LabBorrowHistoryModule {}
