import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { loginDto, registerHostDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(
    dto: loginDto,
  ): Promise<{ access_token: string; message: string }> {
    try {
      // Check if the host exists
      const host = await this.prisma.host.findUnique({
        where: { email: dto.email },
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
      return { message: 'Login successful', access_token: token };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error; // Rethrow handled exceptions
      }

      console.error('Error during login:', error);
      throw new InternalServerErrorException('An error occurred during login');
    }
  }

  async registerHost(dto: registerHostDto): Promise<{
    message: string;
    access_token: string;
  }> {
    try {
      // Check if the email is already registered
      const existingHost = await this.prisma.host.findUnique({
        where: { email: dto.email },
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
      const newHost = await this.prisma.host.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          address: dto.address || null, // Use null for optional fields
          phone: dto.phone || null,
        },
      });

      // Generate and return the JWT token
      const token = await this.signToken(newHost.id, newHost.email);
      return {
        message: 'User successfully registered',
        access_token: token,
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error; // Rethrow handled exceptions
      }

      console.error('Error during registration:', error);
      throw new InternalServerErrorException(
        'Something Went wrong while registering Host',
      );
    }
  }

  private async signToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email };
    const secret = this.config.get<string>('JWT_SECRET');

    return this.jwt.signAsync(payload, { secret, expiresIn: '7d' });
  }
}
