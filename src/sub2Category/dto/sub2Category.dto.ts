/* eslint-disable prettier/prettier */
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSub2CategoryDto {
  @ApiProperty({
    description: 'sub2Category',
    minimum: 3,
    maximum: 30,
  })
  @IsString()
  @Length(3, 30)
  name: string;
}
