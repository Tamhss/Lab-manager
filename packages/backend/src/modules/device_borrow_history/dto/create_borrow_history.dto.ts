import { IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateBorrowHistoryDto {
  @IsNotEmpty()
  deviceReservationId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  deviceId: string;

  @IsDateString()
  @IsNotEmpty()
  actualBorrowTime: string;

  @IsDateString()
  @IsOptional()
  actualReturnTime?: string;

  @IsOptional()
  deviceCondition?: string;
}
