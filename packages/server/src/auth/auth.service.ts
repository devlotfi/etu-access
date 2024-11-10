import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SignInDTO } from './types/sign-in-dto';
import { SignInResponseDTO } from './types/sign-in-response-dto';
import { ApiException } from 'src/shared/types/api-exception';
import { ErrorMessages } from 'src/shared/types/error-messages';
import { TokenService } from './token.service';
import { Request, Response } from 'express';
import { Constants } from 'src/shared/constants';
import { User } from '@prisma/client';
import * as Cookies from 'cookies';
import { SignInRefreshTokenResponseDTO } from './types/sign-in-refresh-token-response-dto';
import { JWTTokenPayload } from './types/token-payload';
import { compare } from 'bcrypt';
import { SignOutResponseDTO } from './types/sign-out-response-dto';
import { TokenType } from './types/token-type';
import { SignInRefreshTokenQuery } from './types/sign-in-refresh-token-query';

@Injectable()
export class AuthService {
  public constructor(
    private readonly databaseService: DatabaseService,
    private readonly tokenService: TokenService,
  ) {}

  private async authenthicate(
    user: User,
    tokenType: TokenType,
    req: Request,
    res: Response,
  ) {
    const accessToken = await this.tokenService.generateAccessToken(
      user,
      tokenType,
    );
    const refreshToken = await this.tokenService.generateRefreshToken(
      user,
      tokenType,
    );

    const cookies = new Cookies(req, res);
    cookies.set(Constants.REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async signIn(
    signInDto: SignInDTO,
    req: Request,
    res: Response,
  ): Promise<SignInResponseDTO> {
    const user = await this.databaseService.user.findUniqueOrThrow({
      where: {
        email: signInDto.email,
      },
    });

    const result = await compare(signInDto.password, user.password);
    if (!result) {
      throw new ApiException(
        ErrorMessages.WRONG_USERNAME_OR_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }

    const { accessToken, refreshToken } = await this.authenthicate(
      user,
      signInDto.tokenType,
      req,
      res,
    );

    user.password = undefined;
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  public async signInRefreshToken(
    signInRefreshTokenQuery: SignInRefreshTokenQuery,
    req: Request,
    res: Response,
  ): Promise<SignInRefreshTokenResponseDTO> {
    const cookies = new Cookies(req, res);
    const refreshToken =
      cookies.get(Constants.REFRESH_TOKEN_COOKIE_KEY) ||
      signInRefreshTokenQuery.refreshToken;
    if (!refreshToken) {
      throw new ApiException(ErrorMessages.NO_TOKEN, HttpStatus.BAD_REQUEST);
    }

    let payload: JWTTokenPayload;
    try {
      payload = await this.tokenService.verifyRefreshToken(refreshToken);
    } catch {
      throw new ApiException(
        ErrorMessages.INVALID_TOKEN,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.databaseService.user.findUniqueOrThrow({
      where: {
        id: payload.userId,
      },
    });

    const accessToken = await this.tokenService.generateAccessToken(
      user,
      payload.tokenType,
    );

    user.password = undefined;
    return {
      user,
      accessToken,
    };
  }

  public async signOut(
    req: Request,
    res: Response,
  ): Promise<SignOutResponseDTO> {
    const cookies = new Cookies(req, res);
    cookies.set(Constants.REFRESH_TOKEN_COOKIE_KEY, null);
    return new SignOutResponseDTO();
  }
}
