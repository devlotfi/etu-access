import { ApiProperty } from '@nestjs/swagger';
import { TokenType } from './token-type';

export class SignInDTO {
  @ApiProperty()
  public email: string;

  @ApiProperty()
  public password: string;

  @ApiProperty({ enum: TokenType })
  public tokenType: TokenType;
}
