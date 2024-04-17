import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from "jsonwebtoken"


@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if(isPublic) return true

    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization.split(" ")?.[1]

    if(!token){
        return false
    }

    try {
      const decoded =jwt.verify(token as string, process.env.JWT_SECRET||"s3cret")

      request['user'] = decoded
      return true
    } catch (error) {
        console.log(error)
      return false
    }
  }
}
