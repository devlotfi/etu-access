import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiProperty()
  public page: number;
}
