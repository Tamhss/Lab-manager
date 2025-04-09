import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateUserHistoryDto } from './dto/create_user_history.dto';

@Injectable()
export class UserHistoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserHistoryDto) {
    return this.prisma.userHistory.create({ data });
  }

  async findAll() {
    return this.prisma.userHistory.findMany();
  }

  async findOne(id: string) {
    return this.prisma.userHistory.findUnique({ where: { userHistoryId: id } });
  }
}
