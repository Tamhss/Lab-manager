import { Module } from '@nestjs/common';
import { DeviceCategoryService } from './category.service';
import { DeviceCategoryController } from './category.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';

@Module({
    controllers: [DeviceCategoryController], // 👈 Đúng vị trí của Controller
    providers: [DeviceCategoryService, PrismaService], // 👈 Đúng vị trí của Service
    exports: [DeviceCategoryService], // 👈 Nếu module khác cần sử dụng service này
})
export class DeviceCategoryModule { }
