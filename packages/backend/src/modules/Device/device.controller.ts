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
    @Get(':deviceId')
    async getById(@Param('devideId') deviceId: string) {
        return this.DeviceService.getById(deviceId);
    }

    // POST: Create new  device
    @Post()
    async create(@Body() data: any) {
        return this.DeviceService.create(data);
    }

    // PUT: Update  device by ID
    @Put(':deviceId')
    async update(@Param('deviceId') deviceId: string, @Body() data: any) {
        return this.DeviceService.update(deviceId, data);
    }

    // DELETE: Remove a  device by ID
    @Delete(':deviceId')
    async delete(@Param('deviceId') deviceId: string) {
        return this.DeviceService.delete(deviceId);
    }

}
