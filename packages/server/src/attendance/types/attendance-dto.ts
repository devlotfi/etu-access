import { ApiProperty } from '@nestjs/swagger';

export class AttendanceDTO {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public studentId: string;

  @ApiProperty()
  public attendanceExportId: string;

  @ApiProperty({ type: () => Date })
  public timestamp: Date;
}
