/* eslint-disable prettier/prettier */
import { Length, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsOptional()
  _id: string;

  @Length(2, 100)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Length(13)
  @IsNotEmpty()
  @IsString()
  phone: string;
}
