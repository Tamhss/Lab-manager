import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class UpdateReservationDto {
  @IsString()
  @IsOptional()
  deviceId?: string;

  @IsString()
  @IsOptional()
  labId?: string;

  @IsDateString()
  @IsOptional()
  startTime?: string;

  @IsDateString()
  @IsOptional()
  endTime?: string;

  @IsString()
  @IsOptional()
  status?: 'PENDING' | 'APPROVED_BY_LECTURER' | 'APPROVED' | 'REJECTED';

  @IsString()
  @IsOptional()
  lecturerId?: string;

  @IsBoolean()
  @IsOptional()
  adminApproved?: boolean;
}