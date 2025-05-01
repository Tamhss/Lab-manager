import { DeviceCategoryService } from './category.service';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    HttpCode,
    HttpStatus,
    Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Controller('devices-category')
export class DeviceCategoryController {
    constructor(private readonly deviceCategoryService: DeviceCategoryService) { }

    @Get()
    getAll() {
        return this.deviceCategoryService.getAll();
    }

    @Get('lab/:labId')
    getByLab(@Param('labId') labId: string) {
        return this.deviceCategoryService.getByLab(labId);
    }

    @Get(':categoryId')
    getById(@Param('categoryId') categoryId: string) {
        return this.deviceCategoryService.getById(categoryId);
    }

    @Post()
    create(@Body() data: Prisma.DeviceCategoryCreateInput) {
        return this.deviceCategoryService.create(data);
    }

    @Put(':categoryId')
    update(
        @Param('categoryId') categoryId: string,
        @Body() data: Prisma.DeviceCategoryUpdateInput,
    ) {
        return this.deviceCategoryService.update(categoryId, data);
    }

    @Delete(':categoryId')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('categoryId') categoryId: string) {
        return this.deviceCategoryService.delete(categoryId);
    }
}
