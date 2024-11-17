import { ApiProperty } from '@nestjs/swagger';
import { AttendanceDTO } from './attendance-dto';

export class AttendanceExportDTO {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public accessControlId: string;

  @ApiProperty({ type: [AttendanceDTO] })
  public attendances: AttendanceDTO[];
}
