import { ApiProperty } from '@nestjs/swagger';

class CountInfo {
  @ApiProperty()
  public attendances: number;
}

export class AttendanceExportDTO {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public accessControlId: string;

  @ApiProperty({ type: () => Date })
  public timestamp: Date;

  @ApiProperty()
  public _count: CountInfo;
}
