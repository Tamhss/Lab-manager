import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DeviceCategoryService } from './category.service';

@Controller('devices-category')
export class DeviceCategoryController {
    constructor(private readonly deviceCategoryService: DeviceCategoryService) { }

    // GET all server devices
    @Get()
    async getAll() {
        return this.deviceCategoryService.getAll();
    }

    // GET a single server device by ID
    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.deviceCategoryService.getById(id);
    }

    // POST: Create new server device
    @Post()
    async create(@Body() data: any) {
        return this.deviceCategoryService.create(data);
    }

    // PUT: Update server device by ID
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return this.deviceCategoryService.update(id, data);
    }

    // DELETE: Remove a server device by ID
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.deviceCategoryService.delete(id);
    }
}
