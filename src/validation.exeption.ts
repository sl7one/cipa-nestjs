/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exeptionResponce: any = exception.getResponse();

    response.status(status).json({
      response: {
        data: {
          statusCode: status,
          error: exeptionResponce.error,
          message: exeptionResponce.message,
        },
      },
    });
  }
}
