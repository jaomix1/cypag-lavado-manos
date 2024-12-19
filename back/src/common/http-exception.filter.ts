import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let data = { message: exception.message, };
    if (exception.getResponse()['message'] != exception.message) {
      const field = { fields: exception.getResponse()['message'] }
      data = { message: exception.message, ...field }
    }
    response
      .status(status)
      .json(data);
  }
}