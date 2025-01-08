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
import { JwtAuthGuard } from '@core/global/auth/guard/jwtAuth.guard';
import { RolesGuard } from '@core/global/auth/guard/roles.guard';
import { ConstanceModule } from '@core/global/constance/constance.module';
import { I18nCustomModule } from '@core/global/i18nCustom/i18nCustom.module';
import { PrismaModule } from '@core/global/prisma/prisma.module';
import { DisableGuard } from '@core/guard/disable.guard';
import { PostInterceptor, ResponseInterceptor } from '@core/interceptor';
import { HttpExceptionFilter } from '@helper/httpException.filter';
import { LoggerMiddleware } from '@helper/logger.middleware';
import { ExampleModule } from '@modules/example/example.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresExample } from '@modules/postgres_example/entity/postgres_entity';
import { PostgresExampleModule } from '@modules/postgres_example/postgres_example.module';
import { AuthModule } from '@core/global/auth/auth.module';
import { CronjobModule } from '@core/global/schedule/schedule.module';
import { ApiModule } from '@core/global/api/api.module';
import { UserModule } from '@modules/user/user.module';
import { DeviceModule } from '@modules/device/device.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    I18nCustomModule,
    ConstanceModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 1000,
    }),
    AuthModule,
    TerminusModule,
    ApiModule,
    ExampleModule,
    PostgresExampleModule,
    UserModule,
    DeviceModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      entities: [PostgresExample],
      database: 'lab',
      synchronize: true,
      logging: true,
    }),

    CronjobModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
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
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
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
