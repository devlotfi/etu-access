import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class AddStudentDTO {
  @ApiProperty()
  @Length(1, 50)
  public firstName: string;

  @ApiProperty()
  @Length(1, 50)
  public lastName: string;

  @ApiProperty({ type: () => Date })
  public dateOfBirth: Date;

  @ApiProperty()
  @Length(1, 16)
  public registration: string;

  @ApiProperty()
  @Length(1, 16)
  public cardId: string;

  @ApiProperty()
  @Length(1, 50)
  public level: string;

  @ApiProperty()
  @Length(1, 50)
  public speciality: string;

  @ApiProperty()
  @Length(1, 50)
  public section: string;

  @ApiProperty()
  @Length(1, 50)
  public directedWorkGroup: string;

  @ApiProperty()
  @Length(1, 50)
  public practicalWorkGroup: string;
}
