import { PaginationResult } from 'src/shared/types/pagination-result';
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceExportDTO } from './attendance-export-dto';

export class AttendanceExportsResponseDTO extends PaginationResult<AttendanceExportDTO> {
  @ApiProperty({ type: [AttendanceExportDTO] })
  public items: AttendanceExportDTO[];
}
