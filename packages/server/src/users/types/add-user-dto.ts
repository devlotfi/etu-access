import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class AddUserDTO {
  @ApiProperty()
  @Length(1, 50)
  public firstName: string;

  @ApiProperty()
  @Length(1, 50)
  public lastName: string;

  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @Length(7, 256)
  public password: string;

  @ApiProperty()
  public isAdmin: boolean;
}
