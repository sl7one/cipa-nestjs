/* eslint-disable prettier/prettier */
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
      const [userFromDataBase] = await this.userModel.find({
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
      const { password: userPassword, ...newUser } =
        await this.userModel.create({
          ...rest,
          token,
          password: hashedPassword,
        });
      return newUser;
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
      const { phone, password } = body;
      const [user] = await this.userModel.find({ phone });

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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const {
        token: userToken,
        phone: userPhone,
        firstName,
        role,
      } = user as any;

      return { token: userToken, phone: userPhone, firstName, role };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Auth error',
          message: 'Credentials are incorrect',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
