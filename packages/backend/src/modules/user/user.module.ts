import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { PrismaService } from '@core/global/prisma/prisma.service';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UsersService, PrismaService],
})
export class UserModule { }