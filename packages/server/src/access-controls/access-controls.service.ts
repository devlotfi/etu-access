import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { AccessControlsResponseDTO } from './types/access-controls-response-dto';
import { AccessControlDTO } from './types/access-control-dto';
import { AddAccessControlDTO } from './types/add-access-control-dto';
import { EditAccessControlDTO } from './types/edit-access-control-dto';

@Injectable()
export class AccessControlsService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async accessControls(
    search: string,
    page: number,
    userId: string,
  ): Promise<AccessControlsResponseDTO> {
    const whereQuery: Prisma.AccessControlWhereInput = {
      userId,
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    };
    const [count, accessControls] = await this.databaseService.$transaction([
      this.databaseService.accessControl.count({
        where: whereQuery,
      }),
      this.databaseService.accessControl.findMany({
        where: whereQuery,
        take: 10,
        skip: 10 * (page - 1),
      }),
    ]);

    return {
      items: accessControls,
      pages: Math.ceil(count / 10),
    };
  }

  public async accessControlDetails(
    id: string,
    userId: string,
  ): Promise<AccessControlDTO> {
    return await this.databaseService.accessControl.findUniqueOrThrow({
      where: {
        id,
        userId,
      },
    });
  }

  public async availableAccessControls(
    userId: string,
  ): Promise<AccessControlDTO[]> {
    return await this.databaseService.accessControl.findMany({
      where: {
        userId,
        open: true,
      },
    });
  }

  public async addAccessControl(
    addAccessControlDto: AddAccessControlDTO,
    userId: string,
  ): Promise<AccessControlDTO> {
    return await this.databaseService.accessControl.create({
      data: {
        userId,
        name: addAccessControlDto.name,
        open: addAccessControlDto.open,
      },
    });
  }

  public async editAccessControl(
    id: string,
    editAccessControlDto: EditAccessControlDTO,
    userId: string,
  ): Promise<AccessControlDTO> {
    return await this.databaseService.accessControl.update({
      data: {
        name: editAccessControlDto.name,
        open: editAccessControlDto.open,
      },
      where: {
        id,
        userId,
      },
    });
  }

  public async deleteAccessControl(
    id: string,
    userId,
  ): Promise<AccessControlDTO> {
    return await this.databaseService.accessControl.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
