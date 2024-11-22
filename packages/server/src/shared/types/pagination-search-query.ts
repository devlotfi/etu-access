import { ApiProperty } from '@nestjs/swagger';

export class PaginationSearchQuery {
  @ApiProperty()
  public search: string;

  @ApiProperty()
  public page: number;
}
