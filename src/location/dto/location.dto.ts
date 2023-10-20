/* eslint-disable prettier/prettier */
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    description: 'location',
    minimum: 3,
    maximum: 100,
  })
  @IsString()
  @Length(3, 100)
  location: string;
}
