import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ErrorMessage } from '@core/enum';
import { handleBCRYPTCompare } from '@helper/utils';
import { PrismaService } from '../prisma/prisma.service';
import { VLoginDto } from './dto';
import { IResponseAuth } from '@core/interface';
import { IJwtPayload } from '@core/global/auth/interface';
import { ConfigService } from '@nestjs/config';
import { EConfiguration } from '@core/config';
import { Login } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async getLoginById(id: number) {
    return this.prisma.login.findFirst({
      where: { id },
    });
  }

  // async signUp(body: VSignUpDto) {
  //   const { username, email, name, password } = body;
  //
  //   const existUserName = await this.prisma.user.findFirst({
  //     where: {
  //       username,
  //     },
  //   });
  //
  //   if (existUserName) {
  //     throw new HttpException(
  //       ErrorMessage.USERNAME_EXISTED,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //
  //   const existEmail = await this.prisma.user.findFirst({
  //     where: {
  //       email: email,
  //     },
  //   });
  //
  //   if (existEmail) {
  //     throw new HttpException(
  //       ErrorMessage.EMAIL_EXISTS,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //
  //   const passwordHash = await handleBCRYPTHash(password);
  //
  //   const newUser = await this.prisma.user.create({
  //     data: {
  //       username,
  //       email,
  //       name,
  //       password: passwordHash,
  //     },
  //   });
  //
  //   return {
  //     newUser,
  //   };
  // }

  async login(body: VLoginDto) {
    const { userId, password } = body;

    const login = !password
      ? await this.handleGeneralUserLogin(userId)
      : await this.handleManagerUserLogin(userId, password);

    const payload: IJwtPayload = {
      loginId: login.id,
    };

    return await this.returnResponseAuth(payload, login);
  }

  private async returnResponseAuth(
    payload: IJwtPayload,
    login: Partial<Login>,
  ): Promise<IResponseAuth> {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get(
        EConfiguration.AUTH_ACCESS_TOKEN_EXPIRE,
      ),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get(
        EConfiguration.AUTH_REFRESH_TOKEN_EXPIRE,
      ),
    });

    return {
      accessToken,
      refreshToken,
      data: login,
    };
  }

  private async handleGeneralUserLogin(userId: string) {
    const login = await this.prisma.login.findFirst({
      where: { userId },
    });

    if (!login || !login.passHusiyoFlag) {
      throw new HttpException(
        ErrorMessage.ID_OR_PASSWORD_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );
    }
    delete login.password;

    return login;
  }

  private async handleManagerUserLogin(userId: string, password: string) {
    const login = await this.prisma.login.findFirst({
      where: { userId },
    });

    if (!login)
      throw new HttpException(
        ErrorMessage.ID_OR_PASSWORD_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );

    const isPasswordHash = await handleBCRYPTCompare(password, login.password);

    if (!isPasswordHash) {
      throw new HttpException(
        ErrorMessage.ID_OR_PASSWORD_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );
    }
    delete login.password;
    return login;
  }
}
