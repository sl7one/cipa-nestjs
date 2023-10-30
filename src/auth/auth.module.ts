/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authProviders } from './schemas/auth.providers';
import { jwtConstants } from './constants/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({ secret: jwtConstants.secret }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders],
})
export class AuthModule {}
