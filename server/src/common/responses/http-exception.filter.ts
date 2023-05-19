import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from './interfaces/error.response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode: number;
    let errorResponse: ErrorResponse;

    const exceptionMessage = exception.response?.message || exception.message;

    const message = Array.isArray(exceptionMessage) ? exceptionMessage : [exceptionMessage];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      errorResponse = {
        success: false,
        statusCode,
        error: exception.name,
        message,
      };
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      errorResponse = {
        success: false,
        statusCode,
        error: 'InternalServerErrorException',
      };
    }

    response.status(statusCode).json(errorResponse);
  }
}
