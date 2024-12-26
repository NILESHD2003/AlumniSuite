import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @HttpCode(HttpStatus.OK)
  @Get('status')
  getStatus(): object {
    return this.appService.status();
  }
}
