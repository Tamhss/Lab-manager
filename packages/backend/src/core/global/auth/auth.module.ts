import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { EConfiguration } from '@core/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

// import { UserModule } from '@modules/user/user.module';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    // UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.get(EConfiguration.RSA_PRIVATE_KEY),
        publicKey: configService.get(EConfiguration.RSA_PUBLIC_KEY),
        signOptions: {
          expiresIn: configService.get(EConfiguration.AUTH_TOKEN_EXPIRE),
          algorithm: 'RS256',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
