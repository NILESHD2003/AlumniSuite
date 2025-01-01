import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Log unexpected errors for debugging
    if (status >= 500) {
      console.error('Unhandled server error:', {
        status,
        exception,
      });
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message:
        typeof message === 'string' ? message : message['message'] || message,
    });
  }
}
