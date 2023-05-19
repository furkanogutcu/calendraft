import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ErrorResponse } from './interfaces/error.response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();

      const errorResponse: ErrorResponse = {
        success: false,
        statusCode,
        error: exception.name,
        message: exception.message,
      };

      response.status(statusCode).json(errorResponse);
    }
  }
}
