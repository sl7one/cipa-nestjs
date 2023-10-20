/* eslint-disable prettier/prettier */
import {
  Length,
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @IsOptional()
  _id: Types.ObjectId;

  @ApiProperty({ description: 'client name', minimum: 3, maximum: 100 })
  @Length(3, 100)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'client phone, match: /^(+380d{9})$/',
    minimum: 13,
    maximum: 13,
  })
  @MinLength(13)
  @MaxLength(13)
  @Matches(/^(\+380\d{9})$/)
  phone: string;
}
