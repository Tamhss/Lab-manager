import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('devices')
export class DeviceController {
    constructor(private readonly DeviceService: DeviceService) { }

    @Get()
    async getAll() {
        return this.DeviceService.getAll();
    }

    @Get(':deviceId')
    async getById(@Param('deviceId') deviceId: string) {
        return this.DeviceService.getById(deviceId);
    }

    @Post()
    async create(@Body() data: any) {
        return this.DeviceService.create(data);
    }

    @Put(':deviceId')
    async update(@Param('deviceId') deviceId: string, @Body() data: any) {
        return this.DeviceService.update(deviceId, data);
    }

    @Delete(':deviceId')
    async delete(@Param('deviceId') deviceId: string) {
        return this.DeviceService.delete(deviceId);
    }

}
