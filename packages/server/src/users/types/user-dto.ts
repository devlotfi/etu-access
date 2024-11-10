import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserDTO {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public isAdmin: boolean;

  public constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.isAdmin = user.isAdmin;
  }
}
