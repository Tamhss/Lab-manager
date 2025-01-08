import { IsString, IsEnum, IsOptional } from 'class-validator';
import { DeviceStatus } from '@prisma/client';

export class VUpdateDeviceDto {
  @IsOptional()
  @IsString()
  deviceName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(DeviceStatus)
  status?: DeviceStatus;
}