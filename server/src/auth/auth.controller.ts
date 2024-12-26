import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, registerHostDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: loginDto): Promise<{ access_token: string }> {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register/host')
  async registerHost(@Body() dto: registerHostDto): Promise<{
    message: string;
    access_token: string;
  }> {
    return this.authService.registerHost(dto);
  }
}
