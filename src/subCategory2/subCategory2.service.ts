/* eslint-disable prettier/prettier */
import {
  Injectable,
  Inject,
  // HttpException,
  // HttpStatus
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSubCategory2Dto } from './dto/subCategory2.dto';

@Injectable()
export class SubCategory2Service {
  constructor(
    @Inject('SUBCATEGORY2_MODEL')
    private subCategory2Model: Model<CreateSubCategory2Dto>,
  ) {}

  async getSubCategory2(): Promise<CreateSubCategory2Dto[]> {
    return await this.subCategory2Model.find({});
  }
}
