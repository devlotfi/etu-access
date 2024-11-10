import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AddUserDTO } from './types/add-user-dto';
import { UserDTO } from './types/user-dto';
import { hash } from 'bcrypt';
import { EditUserDTO } from './types/edit-user-dto';
import { UsersResponseDTO } from './types/users-response-dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async users(search: string, page: number): Promise<UsersResponseDTO> {
    const whereQuery: Prisma.UserWhereInput = {
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
        {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    };
    const [count, users] = await this.databaseService.$transaction([
      this.databaseService.user.count({
        where: whereQuery,
      }),
      this.databaseService.user.findMany({
        where: whereQuery,
        take: 10,
        skip: 10 * (page - 1),
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          isAdmin: true,
        },
      }),
    ]);

    return {
      items: users,
      pages: Math.ceil(count / 10),
    };
  }

  public async userDetails(id: string): Promise<UserDTO> {
    return await this.databaseService.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isAdmin: true,
      },
    });
  }

  public async addUser(addUserDto: AddUserDTO): Promise<UserDTO> {
    return await this.databaseService.user.create({
      data: {
        firstName: addUserDto.firstName,
        lastName: addUserDto.lastName,
        email: addUserDto.email,
        password: await hash(addUserDto.password, 10),
        isAdmin: addUserDto.isAdmin,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isAdmin: true,
      },
    });
  }

  public async editUser(
    id: string,
    editUserDto: EditUserDTO,
  ): Promise<UserDTO> {
    return await this.databaseService.user.update({
      data: {
        firstName: editUserDto.firstName,
        lastName: editUserDto.lastName,
        email: editUserDto.email,
        password: editUserDto.password,
        isAdmin: editUserDto.isAdmin,
      },
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isAdmin: true,
      },
    });
  }

  public async deleteUser(id: string): Promise<UserDTO> {
    return await this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
