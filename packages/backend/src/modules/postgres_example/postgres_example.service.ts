import { Injectable } from '@nestjs/common';

import { PrismaService } from '@core/global/prisma/prisma.service';
import { IPaginationResponse } from '@core/interface';
import { returnPagingData } from '@helper/utils';

import { VCreateExampleDto } from './dto/createExample.dto';
import { VUpdateExampleDto } from './dto/updateExample.dto';
import { VGetExamplesPropertyResponse } from './swagger/output/getExamples.response';

@Injectable()
export class PostgresExampleService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createExampleDto: VCreateExampleDto) {
    // return await this.prisma.examplePostgres.create({s
    //   data: {
    //     name: createExampleDto.name,
    //   },
    // });
  }

  async findAll(): Promise<
    IPaginationResponse<VGetExamplesPropertyResponse[]>
  > {
    // const examplePostgres = await this.prisma.examplePostgres.findMany({
    //   orderBy: {
    //     id: 'desc',
    //   },
    // });
    return returnPagingData<VGetExamplesPropertyResponse[]>(
      // examplePostgres,
      null,
      10,
      {
        page: 1,
        take: 10,
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} examplePostgres`;
  }

  update(id: number, updateExampleDto: VUpdateExampleDto) {
    return `This action updates a #${id} examplePostgres ${updateExampleDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} examplePostgres`;
  }
}
