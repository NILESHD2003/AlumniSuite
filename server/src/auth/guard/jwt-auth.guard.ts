import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private config: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    const user = this.verifyToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = user;

    return this.checkRole(user, roles);
  }

  private extractToken(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }

    const cookieToken = request.cookies?.access_token;
    if (cookieToken) {
      return cookieToken;
    }

    return undefined;
  }

  private verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.config.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token verification failed');
    }
  }

  private checkRole(user: any, requiredRoles: string[]): boolean {
    const userRole = user.role;

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException('Access Denied: Insufficient Permissions');
    }

    return true;
  }
}
