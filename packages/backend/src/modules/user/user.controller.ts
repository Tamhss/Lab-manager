import { Controller, Get, Post, Put, Delete, Param, Body, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // GET all server devices
    @Get()
    async getAll() {
        return this.userService.getAll();
    }

    // GET a single server device by ID
    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    // POST: Create new server device
    @Post()
    async create(@Body() data: any) {
        return this.userService.create(data);
    }

    // PUT: Update server device by ID
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return this.userService.update(id, data);
    }

    // DELETE: Remove a server device by ID
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

}
