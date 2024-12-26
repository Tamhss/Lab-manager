import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { ErrorMessage } from '@core/enum';

export class VCreateExampleSubDto {
  @ApiProperty()
  @IsNumber()
  id!: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: ErrorMessage.MAX_LENGTH_100 })
  mTempleSettingAnniversaryTypeTitle?: string | null;
}

export class VCreateExampleSub2Dto {
  @ApiProperty()
  @IsNumber()
  id!: number;

  @ApiProperty()
  @IsNumber()
  amount!: number;
}

export class VCreateExampleDto {
  @ApiProperty()
  @IsString()
  name!: string;
}
