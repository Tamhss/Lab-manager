import { IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateBorrowHistoryDto {
  @IsNotEmpty()
  labReservationId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  labId: string;

  @IsDateString()
  @IsNotEmpty()
  actualBorrowTime: string;

  @IsDateString()
  @IsOptional()
  actualReturnTime?: string;

  @IsOptional()
  labCondition?: string;
}
