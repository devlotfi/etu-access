import { TokenType } from './token-type';

export interface JWTTokenPayload {
  userId: string;
  isAdmin: boolean;
  tokenType: TokenType;
}
