import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsOptional } from 'class-validator';

export class EditUserDTO {
  @ApiProperty({ required: false })
  @Length(1, 50)
  @IsOptional()
  public firstName?: string;

  @ApiProperty({ required: false })
  @Length(1, 50)
  @IsOptional()
  public lastName?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  public email?: string;

  @ApiProperty({ required: false })
  @Length(7, 256)
  @IsOptional()
  public password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public isAdmin?: boolean;
}
