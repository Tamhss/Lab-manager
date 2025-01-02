import { Injectable } from '@nestjs/common';

import { PrismaService } from '@core/global/prisma/prisma.service';
import { IPaginationResponse } from '@core/interface';
import { returnPagingData } from '@helper/utils';

import { VCreateExampleDto2 } from './dto/createExample.dto';
import { VUpdateExampleDto2 } from './dto/updateExample.dto';
import { VGetExamplesPropertyResponse2 } from './swagger/output/getExamples.response';
import { TypeFile } from '@core/enum/default.enum';

@Injectable()
export class ExampleService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  create(createExampleDto: VCreateExampleDto2) {
    return createExampleDto;
  }

  // async findAll(): Promise<
  //   IPaginationResponse<VGetExamplesPropertyResponse[]>
  // > {
  //   const users = await this.prisma.user.findMany({
  //     orderBy: {
  //       id: 'desc',
  //     },
  //   });

  //   return returnPagingData<VGetExamplesPropertyResponse[]>(
  //     users.map((user) => ({
  //       name: user.name,
  //       username: user.name,
  //       id: user.id,
  //       role: user.role,
  //     })),
  //     10,
  //     {
  //       page: 1,
  //       take: 10,
  //     },
  //   );
  // }

  findOne(id: number) {
    return `This action returns a #${id} example`;
  }

  update(id: number, updateExampleDto: VUpdateExampleDto2) {
    return `This action updates a #${id} example ${updateExampleDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} example`;
  }

}
