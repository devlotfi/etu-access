import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, Length, ValidateNested } from 'class-validator';

class CreateAttendanceDTO {
  @ApiProperty()
  @Length(1, 1024)
  public cardId: string;

  @ApiProperty({ type: () => Date })
  @IsDate()
  public timestamp: Date;
}

export class ExportAttandanceListDTO {
  @ApiProperty({ type: [CreateAttendanceDTO] })
  @ValidateNested({ each: true })
  @Type(() => CreateAttendanceDTO)
  public attendanceList: CreateAttendanceDTO[];
}
