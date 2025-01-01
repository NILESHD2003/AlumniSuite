import { Module } from '@nestjs/common';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [HostController],
  providers: [HostService, JwtAuthGuard],
})
export class HostModule {}
