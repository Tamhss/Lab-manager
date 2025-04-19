import { IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateBorrowHistoryDto {
  @IsUUID()
  @IsNotEmpty()
  reservationId: string;

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
