import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@core/decorator';
import { AuthService } from './auth.service';
import { VLoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async systemLogin(@Body() body: VLoginDto) {
    return this.authService.login(body);
  }

  // @Public()
  // @Post('/system/refresh-token')
  // async systemRefreshToken(@Body() body: VSystemRefreshToken) {
  //   return body;
  // }
  //
  // @Public()
  // @Post('/system/sign-up')
  // async signUp(@Body() body: VSignUpDto) {
  //   return this.authService.signUp(body);
  // }
}
