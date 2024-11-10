import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class EditAccessControlDTO {
  @ApiProperty({ required: false })
  @Length(1, 25)
  @IsOptional()
  public name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public open?: boolean;
}
