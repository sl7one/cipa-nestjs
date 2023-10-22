/* eslint-disable prettier/prettier */
import {
  Injectable,
  Inject,
  // HttpException,
  // HttpStatus
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSubCategoryDto } from './dto/subCategory.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject('SUBCATEGORY_MODEL')
    private subCategoryModel: Model<CreateSubCategoryDto>,
  ) {}

  async getSubCategory(): Promise<CreateSubCategoryDto[]> {
    return await this.subCategoryModel.find({});
  }
}
