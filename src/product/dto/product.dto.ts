/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  subCategory: string;

  @IsString()
  @IsString()
  @IsOptional()
  subCategory2: string;
}
