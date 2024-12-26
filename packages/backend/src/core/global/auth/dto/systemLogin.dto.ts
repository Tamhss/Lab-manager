import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ErrorMessage } from '@core/enum';

// export class VSystemLogin {
//   @IsEmail()
//   @IsNotEmpty()
//   @MaxLength(255, { message: ErrorMessage.MAX_LENGTH_255 })
//   email: string;
//
//   @IsString()
//   @IsNotEmpty()
//   @MinLength(8, { message: ErrorMessage.MIN_LENGTH_8 })
//   @MaxLength(255, { message: ErrorMessage.MAX_LENGTH_255 })
//   password: string;
// }
//
// export class VSignUpDto {
//   @IsString()
//   @IsEmail({}, { message: ErrorMessage.EMAIL_FORMAT })
//   @IsNotEmpty()
//   @MaxLength(255, { message: ErrorMessage.MAX_LENGTH_255 })
//   email: string;
//
//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(255, { message: ErrorMessage.MAX_LENGTH_255 })
//   username: string;
//
//   @IsString()
//   @IsNotEmpty()
//   @MinLength(8, { message: ErrorMessage.MIN_LENGTH_8 })
//   @MaxLength(255, { message: ErrorMessage.MAX_LENGTH_255 })
//   password: string;
//
//   @IsNotEmpty()
//   @IsString()
//   name: string;
// }

export class VLoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: ErrorMessage.MAX_LENGTH_255 })
  userId: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: ErrorMessage.MIN_LENGTH_8 })
  @MaxLength(255, { message: ErrorMessage.MAX_LENGTH_255 })
  password: string;
}
