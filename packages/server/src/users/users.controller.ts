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
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserDTO } from './types/user-dto';
import { AddUserDTO } from './types/add-user-dto';
import { ApiException } from 'src/shared/types/api-exception';
import { EditUserDTO } from './types/edit-user-dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { IsAdmin } from 'src/shared/decorators/is-admin.decorator';
import { UsersResponseDTO } from './types/users-response-dto';
import { PaginationQuery } from 'src/shared/types/pagination-query';
import { IdParams } from '../shared/types/id-params';
import { TokenOfType } from 'src/shared/decorators/token-type.decorator';
import { TokenType } from 'src/auth/types/token-type';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @IsAdmin(true)
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => UsersResponseDTO,
  })
  public async users(@Query() paginationQuery: PaginationQuery) {
    return await this.usersService.users(
      paginationQuery.search,
      paginationQuery.page,
    );
  }

  @Get(':id')
  @IsAdmin(true)
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => UserDTO,
  })
  @ApiNotFoundResponse({
    type: () => ApiException,
  })
  public async userDetails(@Param() idParams: IdParams) {
    return await this.usersService.userDetails(idParams.id);
  }

  @Post()
  @IsAdmin(true)
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => UserDTO,
  })
  @ApiForbiddenResponse({
    type: () => ApiException,
  })
  public async addUser(@Body() addUserDto: AddUserDTO) {
    return await this.usersService.addUser(addUserDto);
  }

  @Patch(':id')
  @IsAdmin(true)
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => UserDTO,
  })
  @ApiNotFoundResponse({
    type: () => ApiException,
  })
  @ApiForbiddenResponse({
    type: () => ApiException,
  })
  public async editUser(
    @Param() idParams: IdParams,
    @Body() editUserDto: EditUserDTO,
  ) {
    return await this.usersService.editUser(idParams.id, editUserDto);
  }

  @Delete(':id')
  @IsAdmin(true)
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: () => UserDTO })
  @ApiNotFoundResponse({
    type: () => ApiException,
  })
  @ApiForbiddenResponse({
    type: () => ApiException,
  })
  public async deleteUser(@Param() idParams: IdParams) {
    return await this.usersService.deleteUser(idParams.id);
  }
}
