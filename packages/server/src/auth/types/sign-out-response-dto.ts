import { ApiProperty } from '@nestjs/swagger';

export class SignOutResponseDTO {
  @ApiProperty()
  public success: boolean = true;
}
