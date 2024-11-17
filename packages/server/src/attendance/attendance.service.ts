import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ExportAttandanceListDTO } from './types/export-attendance-list-dto';
import { AttendanceExportDTO } from './types/attendance-export-dto';

@Injectable()
export class AttendanceService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async exportAttendanceList(
    exportAttendanceListDto: ExportAttandanceListDTO,
    accessControlId: string,
    userId: string,
  ): Promise<AttendanceExportDTO> {
    const timestampMap = new Map<string, Date>();
    for (const attendance of exportAttendanceListDto.attendanceList) {
      timestampMap.set(attendance.cardId, attendance.timestamp);
    }

    return this.databaseService.$transaction(async (prisma) => {
      const studentList = await prisma.student.findMany({
        where: {
          cardId: {
            in: exportAttendanceListDto.attendanceList.map(
              (attendance) => attendance.cardId,
            ),
          },
        },
      });

      return this.databaseService.attendanceExport.create({
        include: {
          attendances: true,
        },
        data: {
          accessControl: {
            connect: {
              id: accessControlId,
              userId,
            },
          },
          attendances: {
            createMany: {
              data: studentList.map((student) => ({
                studentId: student.id,
                timestamp: timestampMap.get(student.cardId) || new Date(),
              })),
            },
          },
        },
      });
    });
  }
}
