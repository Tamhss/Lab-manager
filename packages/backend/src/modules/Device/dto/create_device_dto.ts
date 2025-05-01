import { DeviceStatus } from '@prisma/client';
import { IsString, IsOptional } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  deviceId: string;

  @IsString()
  deviceName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  status?: DeviceStatus;
}