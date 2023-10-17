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

class ClientDto {
  @Length(2, 100)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Length(9, 13)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  message: string;
}

// class OrderNestedDto {
//   @Min(0)
//   price: number;

//   @Min(0)
//   @IsInt()
//   order: number;

//   @Length(2, 100)
//   @IsNotEmpty()
//   @IsString()
//   category: string;
// }

class OrderDto {
  @Length(2, 100)
  @IsNotEmpty()
  @IsString()
  product: string;

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
  @Type(() => ClientDto)
  client: ClientDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  order: OrderDto[];

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
