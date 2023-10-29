/* eslint-disable prettier/prettier */
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<CreateUserDto>,
    private jwtService: JwtService,
  ) {}

  async signIn({ phone, password }): Promise<any> {
    const user = await this.userModel.findOne({ phone });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const { ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  async login(body: CreateUserDto): Promise<CreateUserDto[]> {
    return await this.userModel.find(body);
  }
}
