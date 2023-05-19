import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from './interfaces/error.response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode: number;
    let errorResponse: ErrorResponse;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      errorResponse = {
        success: false,
        statusCode,
        error: exception.name,
        message: exception.message,
      };
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      errorResponse = {
        success: false,
        statusCode,
        error: 'InternalServerErrorException',
        message: exception.message,
      };
    }

    response.status(statusCode).json(errorResponse);
  }
}
