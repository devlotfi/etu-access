import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from 'src/users/types/user-dto';

export class SignInResponseDTO {
  @ApiProperty({ type: () => UserDTO })
  public user: UserDTO;

  @ApiProperty()
  public accessToken: string;

  @ApiProperty()
  public refreshToken: string;
}
