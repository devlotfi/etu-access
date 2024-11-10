import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsOptional } from 'class-validator';

export class SignInRefreshTokenQuery {
  @ApiProperty({ required: false })
  @IsJWT()
  @IsOptional()
  public refreshToken?: string;
}
