import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
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
}
