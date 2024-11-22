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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { IsAdmin } from 'src/shared/decorators/is-admin.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ApiException } from 'src/shared/types/api-exception';
import { IdParams } from 'src/shared/types/id-params';
import { StudentsService } from './students.service';
import { StudentsResponseDTO } from './types/students-response-dto';
import { StudentDTO } from './types/student-dto';
import { AddStudentDTO } from './types/add-student-dto';
import { EditStudentDTO } from './types/edit-student-dto';
import { TokenType } from 'src/auth/types/token-type';
import { TokenOfType } from 'src/shared/decorators/token-type.decorator';
import { StudentsByIdCardsDTO } from './types/students-by-id-cards-dto';
import { PaginationSearchQuery } from 'src/shared/types/pagination-search-query';

@Controller('students')
export class StudentsController {
  public constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @IsAdmin(true)
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => StudentsResponseDTO,
  })
  public async students(@Query() paginationSearchQuery: PaginationSearchQuery) {
    return await this.studentsService.students(
      paginationSearchQuery.search,
      paginationSearchQuery.page,
    );
  }

  @Get(':id')
  @IsAdmin(true)
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => StudentDTO,
  })
  @ApiNotFoundResponse({
    type: () => ApiException,
  })
  public async studentDetails(@Param() idParams: IdParams) {
    return await this.studentsService.studentDetails(idParams.id);
  }

  @Post('/student-id-cards')
  @TokenOfType(TokenType.ACCESS_POINT)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => StudentsResponseDTO,
  })
  public async studentsByCardIds(
    @Query() paginationSearchQuery: PaginationSearchQuery,
    @Body() studentsByIdCardsDto: StudentsByIdCardsDTO,
  ) {
    return await this.studentsService.studentsByCardIds(
      paginationSearchQuery.search,
      paginationSearchQuery.page,
      studentsByIdCardsDto,
    );
  }

  @Post()
  @IsAdmin(true)
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => StudentDTO,
  })
  @ApiForbiddenResponse({
    type: () => ApiException,
  })
  public async addStudent(@Body() addStudentDto: AddStudentDTO) {
    return await this.studentsService.addStudent(addStudentDto);
  }

  @Patch(':id')
  @IsAdmin(true)
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => StudentDTO,
  })
  @ApiNotFoundResponse({
    type: () => ApiException,
  })
  @ApiForbiddenResponse({
    type: () => ApiException,
  })
  public async editUser(
    @Param() idParams: IdParams,
    @Body() editStudentDto: EditStudentDTO,
  ) {
    return await this.studentsService.editStudent(idParams.id, editStudentDto);
  }

  @Delete(':id')
  @IsAdmin(true)
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: () => StudentDTO })
  @ApiNotFoundResponse({
    type: () => ApiException,
  })
  @ApiForbiddenResponse({
    type: () => ApiException,
  })
  public async deleteUser(@Param() idParams: IdParams) {
    return await this.studentsService.deleteStudent(idParams.id);
  }
}
