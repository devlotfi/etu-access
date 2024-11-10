import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
  exports: [TokenService],
})
@Global()
export class AuthModule {}
