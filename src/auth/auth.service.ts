import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_MODEL')
    private userModel: Model<CreateUserDto>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(body: CreateUserDto): Promise<any> {
    try {
      const userFromDataBase = await this.userModel.findOne({
        phone: body.phone,
      });

      if (userFromDataBase) {
        const match = await bcrypt.compare(
          body.password,
          userFromDataBase.password,
        );
        if (!match) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              error: 'Auth error',
              message: 'User is exist, try to login',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const { password, ...rest } = body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const token = await this.jwtService.signAsync(rest);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newUser = await this.userModel.create({
        ...rest,
        token,
        password: hashedPassword,
      });

      const {
        firstName: newUserName,
        phone: newUserPhone,
        token: newUserToken,
        role: newUserRole,
      } = newUser as any;
      return {
        firstName: newUserName,
        phone: newUserPhone,
        token: newUserToken,
        role: newUserRole,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Auth error',
          message: 'User is exist, try to login',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(body: LoginUserDto) {
    try {
      const { phone, password, ...rest } = body;
      const user = await this.userModel.findOne({ phone });
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Auth error',
            message: 'User is not exist',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Auth error',
            message: 'Wrong password',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const newToken = await this.jwtService.signAsync({ phone, ...rest });
      return await this.userModel.findOneAndUpdate(
        { phone },
        { token: newToken },
        { returnDocument: 'after' },
      );
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.statusCode,
          error: error.error,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async current(token: { token: string }) {
    try {
      const user = await this.userModel.findOne(token).lean();
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Auth error',
            message: 'User not found',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch ({ response: { statusCode, error, message } }) {
      throw new HttpException(
        {
          statusCode,
          error,
          message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async logout(userId: string) {
    try {
      await this.userModel.findOneAndUpdate({ _id: userId }, { token: '' });

      return {
        message: 'Logged out',
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.statusCode,
          error: error.error,
          message: error.message,
        },
        error.statusCode,
      );
    }
  }
}
