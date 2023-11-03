import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSubCategoryDto } from './dto/subCategory.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject('SUBCATEGORY_MODEL')
    private subCategoryModel: Model<CreateSubCategoryDto>,
  ) {}

  async getSubCategory(): Promise<CreateSubCategoryDto[]> {
    return await this.subCategoryModel.find({}).lean();
  }

  async addNewSubCategory(body: CreateSubCategoryDto) {
    try {
      const data = await this.subCategoryModel.create(body);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
