import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
    @IsOptional()
    @IsString()
    deviceId?: string;

    @IsOptional()
    @IsString()
    deviceName?: string;

    @IsOptional()
    @IsString()
    labId?: string;

    @IsDateString()
    startTime: string;

    @IsDateString()
    endTime: string;
}
