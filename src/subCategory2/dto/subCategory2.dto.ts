/* eslint-disable prettier/prettier */
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCategory2Dto {
  @ApiProperty({
    description: 'subCategory2',
    minimum: 3,
    maximum: 30,
  })
  @IsString()
  @Length(3, 30)
  subCategory2: string;
}
