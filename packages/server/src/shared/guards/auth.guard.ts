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
      console.log('no authorization');
      return false;
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      console.log('no access token');
      return false;
    }

    let payload: JWTTokenPayload;
    try {
      payload = await this.tokenService.verifyAccessToken(accessToken);
    } catch (error) {
      console.log(error);
      console.log('invalid token');
      return false;
    }

    req.userId = payload.userId;

    const isAdmin = this.reflector.get(IsAdmin, context.getHandler());
    if (
      (isAdmin === true && payload.isAdmin === false) ||
      (isAdmin === false && payload.isAdmin === true)
    ) {
      console.log('admin status error');
      return false;
    }

    const tokenType = this.reflector.get(TokenOfType, context.getHandler());
    console.log(tokenType, payload.tokenType);
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
