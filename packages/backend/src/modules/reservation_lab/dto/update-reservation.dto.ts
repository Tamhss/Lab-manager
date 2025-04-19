import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateReservationDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  actualBorrowTime?: string;

  @IsOptional()
  @IsDateString()
  actualReturnTime?: string;

  @IsString()
  labId?: string;

  @IsOptional()
  adminApproved?: boolean;
}