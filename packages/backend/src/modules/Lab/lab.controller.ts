import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LabService } from './lab.service';

@Controller('labs')
export class LabController {
    constructor(private readonly labService: LabService) { }

    @Get()
    async getAll() {
        return this.labService.getAll();
    }

    @Get(':labId')
    async getById(@Param('labId') labId: string) {
        return this.labService.getById(labId);
    }

    @Post()
    async create(@Body() data: any) {
        return this.labService.create(data);
    }

    @Put(':labId')
    async update(@Param('labId') labId: string, @Body() data: any) {
        return this.labService.update(labId, data);
    }

    @Delete(':labId')
    async delete(@Param('labId') labId: string) {
        return this.labService.delete(labId);
    }

}
