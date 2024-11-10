import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { StudentsResponseDTO } from './types/students-response-dto';
import { Prisma } from '@prisma/client';
import { StudentDTO } from './types/student-dto';
import { AddStudentDTO } from './types/add-student-dto';
import { EditStudentDTO } from './types/edit-student-dto';

@Injectable()
export class StudentsService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async students(
    search: string,
    page: number,
  ): Promise<StudentsResponseDTO> {
    const whereQuery: Prisma.StudentWhereInput = {
      OR: [
        {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    };
    const [count, students] = await this.databaseService.$transaction([
      this.databaseService.student.count({
        where: whereQuery,
      }),
      this.databaseService.student.findMany({
        where: whereQuery,
        take: 10,
        skip: 10 * (page - 1),
      }),
    ]);

    return {
      items: students,
      pages: Math.ceil(count / 10),
    };
  }

  public async studentDetails(id: string): Promise<StudentDTO> {
    return await this.databaseService.student.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  public async addStudent(addStudentDto: AddStudentDTO): Promise<StudentDTO> {
    return await this.databaseService.student.create({
      data: {
        firstName: addStudentDto.firstName,
        lastName: addStudentDto.lastName,
        dateOfBirth: new Date(addStudentDto.dateOfBirth),
        registration: addStudentDto.registration,
        cardId: addStudentDto.cardId,
        level: addStudentDto.level,
        speciality: addStudentDto.speciality,
        section: addStudentDto.section,
        directedWorkGroup: addStudentDto.directedWorkGroup,
        practicalWorkGroup: addStudentDto.practicalWorkGroup,
      },
    });
  }

  public async editStudent(
    id: string,
    editStudentDto: EditStudentDTO,
  ): Promise<StudentDTO> {
    return await this.databaseService.student.update({
      data: {
        firstName: editStudentDto.firstName,
        lastName: editStudentDto.lastName,
        dateOfBirth: new Date(editStudentDto.dateOfBirth),
        registration: editStudentDto.registration,
        cardId: editStudentDto.cardId,
        level: editStudentDto.level,
        speciality: editStudentDto.speciality,
        section: editStudentDto.section,
        directedWorkGroup: editStudentDto.directedWorkGroup,
        practicalWorkGroup: editStudentDto.practicalWorkGroup,
      },
      where: {
        id,
      },
    });
  }

  public async deleteStudent(id: string): Promise<StudentDTO> {
    return await this.databaseService.student.delete({
      where: {
        id,
      },
    });
  }
}
