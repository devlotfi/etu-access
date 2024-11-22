import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { TokenType } from 'src/auth/types/token-type';
import { IsAdmin } from 'src/shared/decorators/is-admin.decorator';
import { TokenOfType } from 'src/shared/decorators/token-type.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ApiException } from 'src/shared/types/api-exception';
import { AttendanceExportDTO } from './types/attendance-export-dto';
import { ExportAttandanceListDTO } from './types/export-attendance-list-dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { IdParams } from 'src/shared/types/id-params';
import { AttendanceExportsResponseDTO } from './types/access-exports-response-dto';
import { PaginationQuery } from 'src/shared/types/pagination-query';
import { AttendanceDTO } from './types/attendance-dto';

@Controller('attendance')
export class AttendanceController {
  public constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/export/:id')
  @IsAdmin(true)
  @TokenOfType(TokenType.ACCESS_POINT)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => AttendanceExportDTO,
  })
  @ApiForbiddenResponse({
    type: () => ApiException,
  })
  public async exportAttendanceList(
    @Body() exportAttendanceListDto: ExportAttandanceListDTO,
    @Param() idParams: IdParams,
    @CurrentUser() userId: string,
  ) {
    return await this.attendanceService.exportAttendanceList(
      exportAttendanceListDto,
      idParams.id,
      userId,
    );
  }

  @Get(':id')
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => AttendanceExportsResponseDTO,
  })
  public async accessControls(
    @Query() paginationSearchQuery: PaginationQuery,
    @Param() idParams: IdParams,
    @CurrentUser() userId: string,
  ) {
    return await this.attendanceService.attendanceExports(
      idParams.id,
      paginationSearchQuery.page,
      userId,
    );
  }

  @Get('students/:id')
  @TokenOfType(TokenType.USER)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [AttendanceDTO],
  })
  public async attendanceExportStudents(
    @Param() idParams: IdParams,
    @CurrentUser() userId: string,
  ) {
    return await this.attendanceService.attendanceExportStudents(
      idParams.id,
      userId,
    );
  }
}
