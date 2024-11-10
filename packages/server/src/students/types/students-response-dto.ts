import { PaginationResult } from 'src/shared/types/pagination-result';
import { ApiProperty } from '@nestjs/swagger';
import { StudentDTO } from './student-dto';

export class StudentsResponseDTO extends PaginationResult<StudentDTO> {
  @ApiProperty({ type: [StudentDTO] })
  public items: StudentDTO[];
}
