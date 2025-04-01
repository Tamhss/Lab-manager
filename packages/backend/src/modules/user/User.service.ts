import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { Lecturer, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        return this.prisma.user.findMany();
    }

    async getById(userId: string) {
        return this.prisma.user.findUnique({
            where: { userId },
        });
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await this.prisma.user.create({
            data: {
                userName: data.userName,
                email: data.email,
                password: data.password,
                role: data.role,
            },
        });
    
        if (data.role === 'LECTURER') {
            await this.prisma.lecturer.create({
                data: {
                    userId: user.userId,
                },
            });
        }
    
        if (data.role === 'STUDENT') {
            await this.prisma.student.create({
                data: {
                    userId: user.userId,
                },
            });
        }
    
        if (data.role === 'ADMIN') {
            await this.prisma.admin.create({
                data: {
                    userId: user.userId,
                },
            });
        }
    
        return user;
    }

    async update(userId: string, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            where: { userId },
            data,
        });
    }

    async delete(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { userId },
        });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        return this.prisma.$transaction(async (prisma) => {
            await prisma.lecturer.deleteMany({
                where: { userId },
            });
    
            await prisma.student.deleteMany({
                where: { userId },
            });
    
            await prisma.admin.deleteMany({
                where: { userId },
            });

            return prisma.user.delete({
                where: { userId },
            });
        });
    }
    
}
