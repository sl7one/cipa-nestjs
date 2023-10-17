/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  Length,
  ValidateNested,
  Min,
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { CreateClientDto } from 'src/client/dto/client.dto';
import { CreateLocationDto } from 'src/location/dto/location.dto';

class OrderDto {
  @Length(2, 100)
  @IsNotEmpty()
  @IsString()
  product: Types.ObjectId;

  @Min(0)
  @IsInt()
  price: number;

  @Min(0)
  @IsInt()
  order: number;

  @Length(2, 100)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  category: string;

  @Length(2, 100)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  subCategory: string;

  @Length(2, 100)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  subCategory2: string;
}

export class CreateOrderDto {
  @IsDateString()
  date: Date;

  @ValidateNested()
  @Type(() => CreateClientDto)
  client: CreateClientDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  order: OrderDto[];

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;

  @IsString()
  @Length(2, 300)
  @IsOptional()
  message: string;
}
