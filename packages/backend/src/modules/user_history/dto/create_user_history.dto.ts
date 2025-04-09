import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserHistoryDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  reservationId: string;
}
