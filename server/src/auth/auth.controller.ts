import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, registerHostDto, sendOtpDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // Use HttpStatus.OK for successful login
  @Post('login')
  async login(
    @Body() body: loginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{
    status: number;
    success: boolean;
    message: string;
    access_token: string;
  }> {
    return body.role === 'host'
      ? await this.authService.loginHost(body, res) // Call loginHost for hosts
      : await this.authService.loginMember(body, res); // Call loginMember for members
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

  // Add Forgot Password endpoint here

  // Add Reset Password endpoint here
}
