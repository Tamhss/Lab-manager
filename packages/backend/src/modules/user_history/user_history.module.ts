import { Module } from '@nestjs/common';
import { UserHistoryService } from './user_history.service';
import { UserHistoryController } from './user_history.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';

@Module({
  controllers: [UserHistoryController],
  providers: [UserHistoryService, PrismaService],
})
export class UserHistoryModule {}