/* eslint-disable prettier/prettier */
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'user phone, match: /^(+380d{9})$/',
    minimum: 13,
    maximum: 13,
  })
  @IsString()
  @Length(3, 100)
  phone: string;

  @ApiProperty({
    description: 'password',
    minimum: 6,
  })
  @IsString()
  @Length(6, 100)
  password: string;
}
