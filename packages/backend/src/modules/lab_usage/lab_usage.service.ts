import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateLabUsageDto } from './dto/create_lab_usage.dto';
import { UpdateLabUsageDto } from './dto/update_lab_usage.dto';

@Injectable()
export class LabUsageService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLabUsageDto) {
    return this.prisma.labUsage.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.labUsage.findMany({
      include: { lab: true },
    });
  }

  findOne(id: string) {
    return this.prisma.labUsage.findUnique({
      where: { labUsageId: id },
      include: { lab: true },
    });
  }

  update(id: string, dto: UpdateLabUsageDto) {
    return this.prisma.labUsage.update({
      where: { labUsageId: id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.labUsage.delete({
      where: { labUsageId: id },
    });
  }
}
