import { ApiProperty } from '@nestjs/swagger';

import { SwaggerInputPaginationDto } from '@core/swagger/dto/index.swagger';

export class VGetExamplesInput2 extends SwaggerInputPaginationDto {
  @ApiProperty({ type: String })
  search!: string;
}
