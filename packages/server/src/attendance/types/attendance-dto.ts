import { ApiProperty } from '@nestjs/swagger';
import { StudentDTO } from 'src/students/types/student-dto';

export class AttendanceDTO {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public studentId: string;

  @ApiProperty({ type: () => StudentDTO })
  public student: StudentDTO;

  @ApiProperty()
  public attendanceExportId: string;

  @ApiProperty({ type: () => Date })
  public timestamp: Date;
}
