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
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';

@Controller('devices-category')
export class DeviceCategoryController {
    constructor(private readonly deviceCategoryService: DeviceCategoryService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getAll() {
        return this.deviceCategoryService.getAll();
    }

    @Get('lab/:labId')
    @UseGuards(AuthGuard('jwt'))
    getByLab(@Param('labId') labId: string) {
        return this.deviceCategoryService.getByLab(labId);
    }

    @Get(':categoryId')
    @UseGuards(AuthGuard('jwt'))
    getById(@Param('categoryId') categoryId: string) {
        return this.deviceCategoryService.getById(categoryId);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() data: Prisma.DeviceCategoryCreateInput) {
        return this.deviceCategoryService.create(data);
    }

    @Put(':categoryId')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('categoryId') categoryId: string,
        @Body() data: Prisma.DeviceCategoryUpdateInput,
    ) {
        return this.deviceCategoryService.update(categoryId, data);
    }

    @Delete(':categoryId')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('categoryId') categoryId: string) {
        return this.deviceCategoryService.delete(categoryId);
    }
}
