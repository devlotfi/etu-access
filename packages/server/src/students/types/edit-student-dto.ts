import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class EditStudentDTO {
  @ApiProperty({ required: false })
  @Length(1, 50)
  @IsOptional()
  public firstName?: string;

  @ApiProperty({ required: false })
  @Length(1, 50)
  @IsOptional()
  public lastName?: string;

  @ApiProperty({ type: () => Date, required: false })
  @IsOptional()
  public dateOfBirth?: Date;

  @ApiProperty({ required: false })
  @Length(1, 16)
  @IsOptional()
  public registration?: string;

  @ApiProperty({ required: false })
  @Length(1, 16)
  @IsOptional()
  public cardId?: string;

  @ApiProperty({ required: false })
  @Length(1, 50)
  @IsOptional()
  public level?: string;

  @ApiProperty({ required: false })
  @Length(1, 50)
  @IsOptional()
  public speciality?: string;

  @ApiProperty()
  @Length(1, 50)
  @IsOptional()
  public section?: string;

  @ApiProperty()
  @Length(1, 50)
  @IsOptional()
  public directedWorkGroup?: string;

  @ApiProperty()
  @Length(1, 50)
  @IsOptional()
  public practicalWorkGroup?: string;
}
