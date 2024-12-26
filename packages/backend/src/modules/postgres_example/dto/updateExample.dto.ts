import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { VCreateExampleDto } from './createExample.dto';

export class VUpdateExampleDto extends OmitType(
  VCreateExampleDto,
  [] as const,
) {
  @ApiProperty()
  @IsString()
  test!: number;
}
