import { Reflector } from '@nestjs/core';
import { TokenType } from 'src/auth/types/token-type';

export const TokenOfType = Reflector.createDecorator<TokenType>();
