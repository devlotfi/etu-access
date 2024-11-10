import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JWTTokenPayload } from 'src/auth/types/token-payload';
import { TokenService } from 'src/auth/token.service';
import { Reflector } from '@nestjs/core';
import { IsAdmin } from '../decorators/is-admin.decorator';
import { TokenOfType } from '../decorators/token-type.decorator';
import { TokenType } from 'src/auth/types/token-type';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorization = req.headers.authorization;
    if (!authorization) {
      return false;
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      return false;
    }

    let payload: JWTTokenPayload;
    try {
      payload = await this.tokenService.verifyAccessToken(accessToken);
    } catch (error) {
      console.log(error);

      return false;
    }

    req.userId = payload.userId;

    const isAdmin = this.reflector.get(IsAdmin, context.getHandler());
    if (
      (isAdmin === true && payload.isAdmin === false) ||
      (isAdmin === false && payload.isAdmin === true)
    ) {
      return false;
    }

    const tokenType = this.reflector.get(TokenOfType, context.getHandler());
    if (
      (tokenType === TokenType.USER &&
        payload.tokenType === TokenType.ACCESS_POINT) ||
      (tokenType === TokenType.ACCESS_POINT &&
        payload.tokenType === TokenType.USER)
    ) {
      return false;
    }

    return true;
  }
}
