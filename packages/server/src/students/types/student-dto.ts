import { ApiProperty } from '@nestjs/swagger';

export class StudentDTO {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;

  @ApiProperty({ type: () => Date })
  public dateOfBirth: Date;

  @ApiProperty()
  public registration: string;

  @ApiProperty()
  public cardId: string;

  @ApiProperty()
  public level: string;

  @ApiProperty()
  public speciality: string;

  @ApiProperty()
  public section: string;

  @ApiProperty()
  public directedWorkGroup: string;

  @ApiProperty()
  public practicalWorkGroup: string;
}
