/* eslint-disable prettier/prettier */
import { IsString, Length, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLocationDto {
  _id: Types.ObjectId;

  @IsString()
  @Length(2, 100)
  @IsOptional()
  location: string;
}
