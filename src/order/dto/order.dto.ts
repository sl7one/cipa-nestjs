import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  ValidateNested,
  Min,
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsMongoId,
} from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

class OrderDto {
  @IsMongoId()
  _id: mongoose.Schema.Types.ObjectId;

  @Min(0)
  @IsInt()
  price: number;

  @Min(0)
  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'date. format ISO',
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'client ID',
  })
  @IsMongoId()
  client: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'orders array',
    type: [OrderDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  order: OrderDto[];

  @ApiProperty({
    description: 'user ID',
  })
  @IsMongoId()
  owner: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'optional',
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    description: 'location ID',
  })
  @IsMongoId()
  @IsOptional()
  location: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'message, optional',
  })
  @IsString()
  @IsOptional()
  message: string;
}
