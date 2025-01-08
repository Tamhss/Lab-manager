import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DeviceService } from './device.service';
import { VCreateDeviceDto } from './dto/createDevice.dto';
import { VUpdateDeviceDto } from './dto/updateDevice.dto';
import { DeviceDto } from './dto/device.dto';
import { Device } from '@prisma/client';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Post()
  async createDevice(
    @Body() createDeviceDto: VCreateDeviceDto,
  ): Promise<DeviceDto> {
    const device = await this.deviceService.createDevice(
      createDeviceDto
    );
    return this.mapDeviceToDto(device);
  }

  @Get()
  async getAllDevices(): Promise<DeviceDto[]> {
    const devices = await this.deviceService.getAllDevices();
    return devices.map(this.mapDeviceToDto);
  }

  @Get(':id')
  async getDeviceById(@Param('id') id: string): Promise<DeviceDto> {
    const device = await this.deviceService.getDeviceById(id);
    return this.mapDeviceToDto(device);
  }

  @Put(':id')
  async updateDevice(
    @Param('id') id: string,
    @Body() updateDeviceDto: VUpdateDeviceDto,
  ): Promise<DeviceDto> {
    const device = await this.deviceService.updateDevice(
      id,
      updateDeviceDto
    );
    return this.mapDeviceToDto(device);
  }

  @Delete(':id')
  async deleteDevice(@Param('id') id: string): Promise<DeviceDto> {
    const device = await this.deviceService.deleteDevice(id);
    return this.mapDeviceToDto(device);
  }

  // Helper method to map Device model to DeviceDto
  private mapDeviceToDto(device: Device): DeviceDto {
    return {
      id: device.id,
      deviceName: device.deviceName,
      description: device.description,
      status: device.status,
    };
  }
}
