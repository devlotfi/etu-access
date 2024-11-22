import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ExportAttandanceListDTO } from './types/export-attendance-list-dto';
import { AttendanceExportDTO } from './types/attendance-export-dto';
import { Prisma } from '@prisma/client';
import { AttendanceExportsResponseDTO } from './types/access-exports-response-dto';

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

    const cardIds = exportAttendanceListDto.attendanceList.map(
      (attendance) => attendance.cardId,
    );

    return this.databaseService.$transaction(async (prisma) => {
      const studentList = await prisma.student.findMany({
        where: {
          cardId: {
            in: cardIds,
          },
        },
      });

      const attendanceData = studentList.map((student) => ({
        studentId: student.id,
        timestamp: timestampMap.get(student.cardId) || new Date(),
      }));

      return this.databaseService.attendanceExport.create({
        include: {
          _count: {
            select: {
              attendances: true,
            },
          },
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
              data: attendanceData,
            },
          },
        },
      });
    });
  }

  public async attendanceExports(
    accessControlId: string,
    page: number,
    userId: string,
  ): Promise<AttendanceExportsResponseDTO> {
    const whereQuery: Prisma.AttendanceExportWhereInput = {
      accessControl: {
        id: accessControlId,
        userId,
      },
    };
    const [count, attendanceExports] = await this.databaseService.$transaction([
      this.databaseService.attendanceExport.count({
        where: whereQuery,
      }),
      this.databaseService.attendanceExport.findMany({
        include: {
          _count: {
            select: {
              attendances: true,
            },
          },
        },
        where: whereQuery,
        take: 10,
        skip: 10 * (page - 1),
      }),
    ]);

    return {
      items: attendanceExports,
      pages: Math.ceil(count / 10),
    };
  }

  public async attendanceExportStudents(
    attendanceExportId: string,
    userId: string,
  ) {
    return await this.databaseService.attendance.findMany({
      where: {
        attendanceExport: {
          id: attendanceExportId,
          accessControl: {
            userId,
          },
        },
      },
      include: {
        student: true,
      },
    });
  }
}
