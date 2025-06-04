import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { DeviceService } from './device.service';
  import { Prisma } from '@prisma/client';
import { CreateDeviceDto } from './dto/create_device_dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
  
  @Controller('devices')
  export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}
  
    @Get()
    @UseGuards(AuthGuard('jwt'))
    getAll() {
      return this.deviceService.getAll();
    }
  
    @Get('lab/:labId')
    @UseGuards(AuthGuard('jwt'))
    getByLab(@Param('labId') labId: string) {
      return this.deviceService.getDevicesByLab(labId);
    }
  
    @Get('category/:categoryId')
    @UseGuards(AuthGuard('jwt'))
    getByCategory(@Param('categoryId') categoryId: string) {
      return this.deviceService.getDevicesByCategory(categoryId);
    }
  
    @Get(':deviceId')
    @UseGuards(AuthGuard('jwt'))
    getById(@Param('deviceId') deviceId: string) {
      return this.deviceService.getById(deviceId);
    }
  
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createDeviceDto: CreateDeviceDto) {
      return this.deviceService.create(createDeviceDto);
    }
  
    @Put(':deviceId')
    @UseGuards(AuthGuard('jwt'))
    update(
      @Param('deviceId') deviceId: string,
      @Body() data: Prisma.DeviceUpdateInput,
    ) {
      return this.deviceService.update(deviceId, data);
    }
  
    @Delete(':deviceId')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('deviceId') deviceId: string) {
      return this.deviceService.delete(deviceId);
    }
  }
  