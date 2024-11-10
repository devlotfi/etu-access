import { ApiProperty } from '@nestjs/swagger';

export abstract class PaginationResult<T> {
  public abstract items: T[];

  @ApiProperty()
  public pages: number;
}
