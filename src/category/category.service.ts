/* eslint-disable prettier/prettier */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_MODEL')
    private categoriesModel: Model<CreateCategoryDto>,
  ) {}

  async getCategories(): Promise<CreateCategoryDto[]> {
    return await this.categoriesModel.find({});
  }

  async addNewCategory(body: CreateCategoryDto) {
    try {
      const data = await this.categoriesModel.create(body);
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
