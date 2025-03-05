import { IsString, IsNotEmpty } from 'class-validator';

export class CreateServerDeviceDto {
    @IsString()
    @IsNotEmpty()
    deviceName: string;

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    deviceId: string;

    @IsString()
    cpu: string;

    @IsString()
    ram: string;

    @IsString()
    storage: string;
}
