import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateBorrowHistoryDto } from './dto/create_borrow_history.dto';
import { UpdateBorrowHistoryDto } from './dto/update_borrow_history.dto';

@Injectable()
export class BorrowHistoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBorrowHistoryDto) {
    return this.prisma.deviceBorrowHistory.upsert({
      where: { reservationId: data.reservationId },
      update: {
        actualBorrowTime: data.actualBorrowTime,
        actualReturnTime: data.actualReturnTime,
        deviceCondition: data.deviceCondition,
      },
      create: data,
    });
  }

  async findAll() {
    return this.prisma.deviceBorrowHistory.findMany();
  }

  async findOne(id: string) {
    return this.prisma.deviceBorrowHistory.findUnique({ where: { borrowHistoryId: id } });
  }

  async update(id: string, data: UpdateBorrowHistoryDto) {
    return this.prisma.deviceBorrowHistory.update({ where: { borrowHistoryId: id }, data });
  }

  async remove(id: string) {
    return this.prisma.deviceBorrowHistory.delete({ where: { borrowHistoryId: id } });
  }
}
