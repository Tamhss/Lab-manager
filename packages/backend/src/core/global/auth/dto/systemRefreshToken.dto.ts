import { IsString } from 'class-validator';

export class VSystemRefreshToken {
  @IsString()
  refreshToken: string;
}
