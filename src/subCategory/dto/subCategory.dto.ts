import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCategoryDto {
  @ApiProperty({
    description: 'subCategory',
    minimum: 3,
    maximum: 30,
  })
  @IsString()
  @Length(3, 30)
  name: string;
}
