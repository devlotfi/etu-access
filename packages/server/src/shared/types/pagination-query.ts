import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiProperty()
  public search: string;

  @ApiProperty()
  public page: number;
}
