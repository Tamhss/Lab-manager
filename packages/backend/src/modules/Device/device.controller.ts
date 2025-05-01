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
  
  @Controller('devices')
  export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}
  
    @Get()
    getAll() {
      return this.deviceService.getAll();
    }
  
    @Get('lab/:labId')
    getByLab(@Param('labId') labId: string) {
      return this.deviceService.getDevicesByLab(labId);
    }
  
    @Get('category/:categoryId')
    getByCategory(@Param('categoryId') categoryId: string) {
      return this.deviceService.getDevicesByCategory(categoryId);
    }
  
    @Get(':deviceId')
    getById(@Param('deviceId') deviceId: string) {
      return this.deviceService.getById(deviceId);
    }
  
    @Post()
    async create(@Body() createDeviceDto: CreateDeviceDto) {
      return this.deviceService.create(createDeviceDto);
    }
  
    @Put(':deviceId')
    update(
      @Param('deviceId') deviceId: string,
      @Body() data: Prisma.DeviceUpdateInput,
    ) {
      return this.deviceService.update(deviceId, data);
    }
  
    @Delete(':deviceId')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('deviceId') deviceId: string) {
      return this.deviceService.delete(deviceId);
    }
  }
  