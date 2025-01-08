import { ApiProperty } from '@nestjs/swagger';
import { DeviceStatus } from '@prisma/client';
import {
  IsEnum,
  IsString,
} from 'class-validator';

export class VCreateDeviceDto {
  @ApiProperty()
  @IsString()
  deviceName!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsEnum(DeviceStatus)
  status: DeviceStatus;
}
