import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServerDeviceService } from './server.service';

@Controller('server-devices')
export class ServerDeviceController {
    constructor(private readonly serverDeviceService: ServerDeviceService) { }

    // GET all server devices
    @Get()
    async getAll() {
        return this.serverDeviceService.getAll();
    }

    // GET a single server device by ID
    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.serverDeviceService.getById(id);
    }

    // POST: Create new server device
    @Post()
    async create(@Body() data: any) {
        return this.serverDeviceService.create(data);
    }

    // PUT: Update server device by ID
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return this.serverDeviceService.update(id, data);
    }

    // DELETE: Remove a server device by ID
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.serverDeviceService.delete(id);
    }
}
