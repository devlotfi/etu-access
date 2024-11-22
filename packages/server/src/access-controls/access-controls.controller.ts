import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessControlsService } from './access-controls.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { TokenType } from 'src/auth/types/token-type';
import { TokenOfType } from 'src/shared/decorators/token-type.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ApiException } from 'src/shared/types/api-exception';
import { IdParams } from 'src/shared/types/id-params';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AccessControlsResponseDTO } from './types/access-controls-response-dto';
import { AccessControlDTO } from './types/access-control-dto';
import { AddAccessControlDTO } from './types/add-access-control-dto';
import { EditAccessControlDTO } from './types/edit-access-control-dto';
import { PaginationSearchQuery } from 'src/shared/types/pagination-search-query';

@Controller('access-controls')
export class AccessControlsController {
  public constructor(
    private readonly accessControlsService: AccessControlsService,
  ) {}

  @Get('all')
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => AccessControlsResponseDTO,
  })
  public async accessControls(
    @Query() paginationSearchQuery: PaginationSearchQuery,
    @CurrentUser() userId: string,
  ) {
    return await this.accessControlsService.accessControls(
      paginationSearchQuery.search,
      paginationSearchQuery.page,
      userId,
    );
  }

  @Get('all/:id')
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => AccessControlDTO,
  })
  @ApiNotFoundResponse({
    type: () => ApiException,
  })
  public async accessControlDetails(
    @Param() idParams: IdParams,
    @CurrentUser() userId: string,
  ) {
    return await this.accessControlsService.accessControlDetails(
      idParams.id,
      userId,
    );
  }

  @Get('available')
  @TokenOfType(TokenType.ACCESS_POINT)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [AccessControlDTO],
  })
  @ApiNotFoundResponse({
    type: () => ApiException,
  })
  public async availableAccessControls(@CurrentUser() userId: string) {
    return await this.accessControlsService.availableAccessControls(userId);
  }

  @Post()
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => AccessControlDTO,
  })
  @ApiForbiddenResponse({
    type: () => ApiException,
  })
  public async addAccessControl(
    @Body() addAccessControlDto: AddAccessControlDTO,
    @CurrentUser() userId: string,
  ) {
    return await this.accessControlsService.addAccessControl(
      addAccessControlDto,
      userId,
    );
  }

  @Patch(':id')
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => AccessControlDTO,
  })
  @ApiNotFoundResponse({
    type: () => ApiException,
  })
  @ApiForbiddenResponse({
    type: () => ApiException,
  })
  public async editAccessControl(
    @Param() idParams: IdParams,
    @Body() editAccessControlDTO: EditAccessControlDTO,
    @CurrentUser() userId: string,
  ) {
    return await this.accessControlsService.editAccessControl(
      idParams.id,
      editAccessControlDTO,
      userId,
    );
  }

  @Delete(':id')
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: () => AccessControlDTO })
  @ApiNotFoundResponse({
    type: () => ApiException,
  })
  @ApiForbiddenResponse({
    type: () => ApiException,
  })
  public async deleteAccessControl(
    @Param() idParams: IdParams,
    @CurrentUser() userId: string,
  ) {
    return await this.accessControlsService.deleteAccessControl(
      idParams.id,
      userId,
    );
  }
}
