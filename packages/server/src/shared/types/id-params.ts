import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class IdParams {
  @ApiProperty()
  @IsUUID()
  public id: string;
}
