import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class AddAccessControlDTO {
  @ApiProperty()
  @Length(1, 25)
  public name: string;

  @ApiProperty()
  public open: boolean;
}
