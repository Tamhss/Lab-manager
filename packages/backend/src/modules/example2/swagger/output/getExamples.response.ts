import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  SwaggerResponsePaginationDto,
  SwaggerResponseSuccessDto,
} from '@core/swagger/response/index.response';

export class VGetExamplesPropertyResponse2 {
  @ApiProperty({ type: String })
  name!: string;
  username?: string;
}

export class VGetExamplesWithPaginationResponse2 extends SwaggerResponsePaginationDto {
  @ApiProperty({ type: () => [VGetExamplesPropertyResponse2] })
  data!: VGetExamplesPropertyResponse2[];
}

export class VGetExamplesResponse extends SwaggerResponseSuccessDto {
  @ApiProperty({ type: () => VGetExamplesWithPaginationResponse2 })
  data!: VGetExamplesWithPaginationResponse2;
}
