import { Type } from 'class-transformer';
import {
  IsDateString,
  ValidateNested,
  Min,
  IsInt,
  IsNotEmpty,
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

export class CreatePurchaseDto {
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
}
