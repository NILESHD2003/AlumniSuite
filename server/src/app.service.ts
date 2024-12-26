import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  status(): object {
    return {
      success: true,
      message: 'Services are Live',
    };
  }
}
