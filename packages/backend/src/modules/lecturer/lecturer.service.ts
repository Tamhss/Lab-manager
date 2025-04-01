// src/lecturers/lecturer.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { LecturerDto } from './dto/lecturer.dto';

@Injectable()
export class LecturerService {
  constructor(private prisma: PrismaService) {}

  async getAllLecturers(): Promise<LecturerDto[]> {
    const lecturers = await this.prisma.lecturer.findMany({
      include: {
        user: {
          select: {
            userId: true,
            userName: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  
    console.log("Dữ liệu sau khi map trong Service:");
    const mappedLecturers = lecturers.map(lecturer => ({
      lecturerId: lecturer.lecturerId,
      userId: lecturer.user.userId, // Lấy từ `lecturer.user`
      userName: lecturer.user.userName,
      email: lecturer.user.email,
      role: lecturer.user.role,
      createdAt: lecturer.user.createdAt,
      updatedAt: lecturer.user.updatedAt,
    }));
  
    console.log(mappedLecturers);
    return mappedLecturers;
  }
  
}