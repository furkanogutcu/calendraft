import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { SuccessResponse } from './interfaces/success.response';

@Injectable()
export class HttpSuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpResponse = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
          const response: SuccessResponse = {
            success: true,
            statusCode: httpResponse.statusCode,
            data,
          };

          return response;
        }
      }),
    );
  }
}
