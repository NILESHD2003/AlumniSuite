import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule to load env variables

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure environment variables are loaded
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Get the secret from env
      // signOptions: { expiresIn: '1h' }, // Optional: Set a default expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
