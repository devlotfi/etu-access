import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, Length, ValidateNested } from 'class-validator';

class CreateAttendanceDTO {
  @ApiProperty()
  @Length(0, 1024)
  public cardId: string;

  @ApiProperty({ type: () => Date })
  @IsDateString()
  public timestamp: Date;
}

export class ExportAttandanceListDTO {
  @ApiProperty({ type: [CreateAttendanceDTO] })
  @ValidateNested({ each: true })
  @Type(() => CreateAttendanceDTO)
  public attendanceList: CreateAttendanceDTO[];
}
