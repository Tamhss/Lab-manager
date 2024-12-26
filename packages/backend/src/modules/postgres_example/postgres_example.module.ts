import { Module } from '@nestjs/common';

import { PostgresExampleController } from './postgres_example.controller';
import { PostgresExampleService } from './postgres_example.service';

@Module({
  controllers: [PostgresExampleController],
  providers: [PostgresExampleService],
})
export class PostgresExampleModule {}
