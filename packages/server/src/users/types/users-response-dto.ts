import { PaginationResult } from 'src/shared/types/pagination-result';
import { UserDTO } from './user-dto';
import { ApiProperty } from '@nestjs/swagger';

export class UsersResponseDTO extends PaginationResult<UserDTO> {
  @ApiProperty({ type: [UserDTO] })
  public items: UserDTO[];
}
