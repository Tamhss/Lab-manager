import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class ScheduleService {
  constructor() {}
  // TODO example
  @Cron('5 0 * * *', {
    name: 'ExampleCronJob',
  })
  ExampleCronjob() {
    console.log('ExampleCronjob');
    return;
  }
}
