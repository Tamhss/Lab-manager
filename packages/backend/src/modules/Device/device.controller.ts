import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('devices')
export class DeviceController {
    constructor(private readonly DeviceService: DeviceService) { }

    // GET all  devices
    @Get()
    async getAll() {
        return this.DeviceService.getAll();
    }

    // GET a single  device by ID
    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.DeviceService.getById(id);
    }

    // POST: Create new  device
    @Post()
    async create(@Body() data: any) {
        return this.DeviceService.create(data);
    }

    // PUT: Update  device by ID
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return this.DeviceService.update(id, data);
    }

    // DELETE: Remove a  device by ID
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.DeviceService.delete(id);
    }

}
