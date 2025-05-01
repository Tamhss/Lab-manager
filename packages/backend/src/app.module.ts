import { LabBorrowHistory } from './../node_modules/.prisma/client/index.d';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { configuration, EConfiguration } from '@core/config';
import { PrismaModule } from '@core/global/prisma/prisma.module';
import { DisableGuard } from '@core/guard/disable.guard';
import { PostInterceptor, ResponseInterceptor } from '@core/interceptor';
import { LoggerMiddleware } from '@helper/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@core/global/auth/auth.module';
import { ApiModule } from '@core/global/api/api.module';
import { UserModule } from '@modules/user/user.module';
import { DeviceModule } from '@modules/device/device.module';
import { DeviceCategoryModule } from '@modules/devices_category/category.module';
import { ReservationDeviceModule } from '@modules/reservation_device/reservation_device.module';
import { UploadModule } from './modules/upload_device/upload.module';
import { LecturerModule } from '@modules/lecturer/lecturer.module';
import { DeviceBorrowHistoryModule } from '@modules/device_borrow_history/borrow_history.module';
import { UserHistoryModule } from '@modules/user_history/user_history.module';
import { LabModule } from '@modules/Lab/lab.module';
import { ReservationLabModule } from '@modules/reservation_lab/reservation_lab.module';
import { LabBorrowHistoryModule } from '@modules/lab_borrow_history/borrow_history.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 1000,
    }),
    AuthModule,
    TerminusModule,
    ApiModule,
    UserModule,
    DeviceModule,
    LabModule,
    DeviceCategoryModule,
    ReservationDeviceModule,
    AuthModule,
    UploadModule,
    LecturerModule,
    DeviceBorrowHistoryModule,
    UserHistoryModule,
    ReservationLabModule,
    LabBorrowHistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PostInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: DisableGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
