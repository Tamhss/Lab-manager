import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The user name' })
  @IsString()
  userName: string;

  @ApiProperty({ description: 'The user email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The user password' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'The user role', enum: Role })
  @IsEnum(Role)
  role: Role;
}
