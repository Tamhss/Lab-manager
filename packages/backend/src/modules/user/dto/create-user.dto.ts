import { IsString, IsNotEmpty } from 'class-validator';

export class CreateServerDeviceDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

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
