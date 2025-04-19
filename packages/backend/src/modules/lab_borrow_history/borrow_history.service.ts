import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateBorrowHistoryDto } from './dto/create_borrow_history.dto';
import { UpdateBorrowHistoryDto } from './dto/update_borrow_history.dto';

@Injectable()
export class BorrowHistoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBorrowHistoryDto) {
    return this.prisma.labBorrowHistory.upsert({
      where: { reservationId: data.reservationId },
      update: {
        actualBorrowTime: data.actualBorrowTime,
        actualReturnTime: data.actualReturnTime,
        labCondition: data.labCondition,
      },
      create: data,
    });
  }

  async findAll() {
    return this.prisma.labBorrowHistory.findMany();
  }

  async findOne(id: string) {
    return this.prisma.labBorrowHistory.findUnique({ where: { borrowHistoryId: id } });
  }

  async update(id: string, data: UpdateBorrowHistoryDto) {
    return this.prisma.labBorrowHistory.update({ where: { borrowHistoryId: id }, data });
  }

  async remove(id: string) {
    return this.prisma.labBorrowHistory.delete({ where: { borrowHistoryId: id } });
  }
}
