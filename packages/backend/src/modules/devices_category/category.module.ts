import { Module } from '@nestjs/common';
import { DeviceCategoryService } from './category.service';
import { DeviceCategoryController } from './category.controller';
import { PrismaService } from '@core/global/prisma/prisma.service';

@Module({
    controllers: [DeviceCategoryController],
    providers: [DeviceCategoryService, PrismaService],
    exports: [DeviceCategoryService],
})
export class DeviceCategoryModule { }
