import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString } from 'class-validator';

export class StudentsByIdCardsDTO {
  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @ArrayMaxSize(1024)
  @IsString({ each: true })
  public studentIdCards: string[];
}
