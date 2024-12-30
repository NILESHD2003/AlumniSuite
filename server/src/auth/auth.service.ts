import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as otpGenerator from 'otp-generator';
import { loginDto, registerHostDto, sendOtpDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import Host from '../host/schema/host.schema';
import OTP from './schema/OTP.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async loginHost(dto: loginDto): Promise<{
    status: number;
    success: boolean;
    access_token: string;
    message: string;
  }> {
    // Check if the host exists
    const host = await Host.findOne({
      email: dto.email,
    });

    if (!host) {
      throw new NotFoundException('Host not registered');
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(dto.password, host.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return the JWT token
    const token = await this.signToken(host.id, host.email);
    return {
      status: HttpStatus.CONTINUE,
      success: true,
      message: 'Login successful',
      access_token: token,
    };
  }

  async registerHost(dto: registerHostDto): Promise<{
    status: number;
    success: boolean;
    message: string;
    access_token: string;
  }> {
    // Check if the email is already registered
    const existingHost = await Host.findOne({
      email: dto.email,
    });

    if (existingHost) {
      throw new ConflictException('User already exists');
    }

    // Validate that passwords match
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create the new host
    const newHost = await Host.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      address: dto.address || null, // Use null for optional fields
      phone: dto.phone || null,
    });

    // Generate and return the JWT token
    const token = await this.signToken(newHost.id, newHost.email);
    return {
      status: HttpStatus.CREATED,
      success: true,
      message: 'User successfully registered',
      access_token: token,
    };
  }

  async sendOTP(
    dto: sendOtpDto,
  ): Promise<{ status: number; success: boolean; message: string }> {
    //check if the host exists
    const host = await Host.findOne({
      email: dto.email,
    });

    if (host) {
      throw new ConflictException('Host already exists');
    }
    //create a new OTP
    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });
    }
    //send the OTP to the host email
    const otpPayload = {
      email: dto.email,
      otp: otp,
      hostName: dto.hostName,
    };
    await OTP.create(otpPayload);

    return {
      status: HttpStatus.CREATED,
      success: true,
      message: 'OTP sent successfully',
    };
  }

  private async signToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email };
    const secret = this.config.get<string>('JWT_SECRET');

    return this.jwt.signAsync(payload, { secret, expiresIn: '7d' });
  }
}
