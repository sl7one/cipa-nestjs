/* eslint-disable prettier/prettier */
import {
  Length,
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateClientDto {
  @IsOptional()
  _id: string;

  @Length(3, 100)
  @IsNotEmpty()
  @IsString()
  name: string;

  @MinLength(13)
  @MaxLength(13)
  @IsString()
  phone: string;
}
