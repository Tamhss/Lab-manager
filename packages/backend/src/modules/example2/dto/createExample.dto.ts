import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinDate,
  ValidateNested,
} from 'class-validator';

import { EDisplayStatus, ErrorMessage } from '@core/enum';

export class VCreateExampleSubDto2 {
  @ApiProperty()
  @IsNumber()
  id!: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: ErrorMessage.MAX_LENGTH_100 })
  mTempleSettingAnniversaryTypeTitle?: string | null;
}

export class VCreateExampleSub2Dto2 {
  @ApiProperty()
  @IsNumber()
  id!: number;

  @ApiProperty()
  @IsNumber()
  amount!: number;
}

export class VCreateExampleDto2 {
  @ApiProperty()
  @IsString()
  name!: number;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNumber()
  age!: number;

  @ApiProperty()
  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  birthday!: Date;

  @ApiProperty({
    required: false,
    enum: EDisplayStatus,
    enumName: 'EDisplayStatus',
  })
  @IsOptional()
  @IsEnum(EDisplayStatus)
  gender?: EDisplayStatus | null;

  @ApiProperty()
  @IsString()
  @MaxLength(100, { message: ErrorMessage.MAX_LENGTH_100 })
  description!: string;

  @ApiProperty({ type: [VCreateExampleSubDto2], required: false })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(1)
  @ValidateNested({ each: true })
  @Type(() => VCreateExampleSubDto2)
  sub1?: VCreateExampleSubDto2[] | null;

  @ApiProperty({ type: VCreateExampleSub2Dto2 })
  @ValidateNested()
  @Type(() => VCreateExampleSub2Dto2)
  sub2!: VCreateExampleSub2Dto2;
}
