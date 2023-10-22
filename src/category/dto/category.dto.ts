/* eslint-disable prettier/prettier */
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'category',
    minimum: 3,
    maximum: 30,
  })
  @IsString()
  @Length(3, 30)
  category: string;
}
