import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AccessControlsModule } from './access-controls/access-controls.module';
import { StudentsModule } from './students/students.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, DatabaseModule, UsersModule, AccessControlsModule, StudentsModule, AttendanceModule],
})
export class AppModule {}
