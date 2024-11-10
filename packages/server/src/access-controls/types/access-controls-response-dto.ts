import { PaginationResult } from 'src/shared/types/pagination-result';
import { ApiProperty } from '@nestjs/swagger';
import { AccessControlDTO } from './access-control-dto';

export class AccessControlsResponseDTO extends PaginationResult<AccessControlDTO> {
  @ApiProperty({ type: [AccessControlDTO] })
  public items: AccessControlDTO[];
}
