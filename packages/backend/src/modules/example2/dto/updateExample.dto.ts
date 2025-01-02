import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsString, MinDate } from 'class-validator';

import { VCreateExampleDto2 } from './createExample.dto';

export class VUpdateExampleDto2 extends OmitType(
  VCreateExampleDto2,
  [] as const,
) {
  @ApiProperty()
  @IsString()
  test!: number;

  @ApiProperty()
  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  test2!: Date;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  test3!: boolean;

  @ApiPropertyOptional()
  @IsString()
  test4?: string | null;
}
