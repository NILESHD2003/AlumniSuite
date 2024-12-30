import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, registerHostDto, sendOtpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: loginDto): Promise<{ access_token: string }> {
    return await (body.role === 'host'
      ? this.authService.loginHost(body)
      : null);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register/host')
  async registerHost(@Body() body: registerHostDto): Promise<{
    message: string;
    access_token: string;
  }> {
    return await this.authService.registerHost(body);
  }

  @Post('send-otp')
  async sendOtp(
    @Body() body: sendOtpDto,
  ): Promise<{ status: number; success: boolean; message: string }> {
    return await this.authService.sendOTP(body);
  }
}
