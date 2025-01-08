import { IsString, IsEnum, IsOptional } from 'class-validator';
import { DeviceStatus } from '@prisma/client';

export class DeviceDto {
    @IsString()
    id: string;

    @IsString()
    deviceName: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(DeviceStatus)
    status: DeviceStatus;
}