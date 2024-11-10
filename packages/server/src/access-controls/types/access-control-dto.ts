import { ApiProperty } from '@nestjs/swagger';

export class AccessControlDTO {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public userId: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public open: boolean;

  @ApiProperty({ type: () => Date })
  public createdAt: Date;
}
