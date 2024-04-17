import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handleErrors(error: any): void {
    const resMessage =
      error.response?.data?.message || error.message || error.toString();

    switch (error.status) {
      case 400:
        throw new HttpException(
          {
            status: 'failed',
            responseCode: HttpStatus.BAD_REQUEST,
            message: `Failed to fetch resource!`,
            error: resMessage,
            timestamp: new Date().toISOString(),
          },
          HttpStatus.BAD_REQUEST,
        );
      case 401:
        throw new UnauthorizedException({
          status: 'failed',
          responseCode: HttpStatus.UNAUTHORIZED,
          message: 'You are not authorized to access this services!',
          error: resMessage,
          timestamp: new Date().toISOString(),
        });
      case 403:
        throw new ForbiddenException({
          status: 'failed',
          responseCode: HttpStatus.FORBIDDEN,
          message: 'You are not authorized to perform this action',
          error: resMessage,
          timestamp: new Date().toISOString(),
        });
      case 404:
        throw new NotFoundException({
          status: 'failed',
          responseCode: HttpStatus.NOT_FOUND,
          message: 'Resource not found!',
          error: resMessage,
          timestamp: new Date().toISOString(),
        });
      default:
        throw new InternalServerErrorException({
          status: 'failed',
          responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There was an internal server error!',
          error: resMessage,
          timestamp: new Date().toISOString(),
        });
    }
  }
}
