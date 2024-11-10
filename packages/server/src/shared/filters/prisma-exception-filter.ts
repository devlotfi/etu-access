import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ErrorMessages } from '../types/error-messages';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let apiException: { message: string; statusCode: number };

    switch (exception.code) {
      case 'P2025':
        apiException = {
          message: ErrorMessages.NOT_FOUND,
          statusCode: HttpStatus.NOT_FOUND,
        };
        break;
      case 'P2002':
        apiException = {
          message: ErrorMessages.UNIQUE_CONSTRAINT_VIOLATION,
          statusCode: HttpStatus.FORBIDDEN,
        };
        break;
      case 'P2003':
        apiException = {
          message: ErrorMessages.FOREIGN_KEY_CONSTRAINT_VIOLATION,
          statusCode: HttpStatus.FORBIDDEN,
        };
        break;
      default:
        apiException = {
          message: ErrorMessages.INTERNAL_SERVER_ERROR,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
        break;
    }
    response.status(apiException.statusCode).json({
      message: apiException.message,
      statusCode: apiException.statusCode,
    });
  }
}
