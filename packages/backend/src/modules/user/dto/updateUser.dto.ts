import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'The user name', required: false })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiProperty({ description: 'The user email', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'The user password', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'The user role', enum: Role, required: false })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
