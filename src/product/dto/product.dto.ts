/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, Min, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'product-title',
    minimum: 3,
    maximum: 30,
  })
  @Length(3, 30)
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'URL img',
  })
  @IsString()
  @IsOptional()
  img: string;

  @ApiProperty({
    description: 'category MongoID',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'subCategory MongoID',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  subCategory: string;

  @ApiProperty({
    description: 'sub2Category MongoID',
  })
  @IsString()
  @IsOptional()
  sub2Category: string;

  @ApiProperty({
    description: 'price',
    minimum: 0,
  })
  @Min(0)
  price: number;
}
