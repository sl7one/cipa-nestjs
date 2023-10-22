/* eslint-disable prettier/prettier */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/product.dto';
import { CreateCategoryDto } from '../category/dto/category.dto';
import { CreateSubCategoryDto } from '../subCategory/dto/subCategory.dto';
import { CreateSub2CategoryDto } from '../sub2Category/dto/sub2Category.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<CreateProductDto>,

    @Inject('CATEGORY_MODEL')
    private categoryModel: Model<CreateCategoryDto>,

    @Inject('SUBCATEGORY_MODEL')
    private subCategoryModel: Model<CreateSubCategoryDto>,

    @Inject('SUB2CATEGORY_MODEL')
    private sub2CategoryModel: Model<CreateSub2CategoryDto>,
  ) {}

  async getProducts(): Promise<CreateProductDto[]> {
    return await this.productModel.find({});
  }

  async updateProduct(
    _id: string,
    body: CreateProductDto,
  ): Promise<CreateProductDto[]> {
    const { category, subCategory = null, sub2Category = null, ...rest } = body;

    const categories = { category: '', subCategory: '', sub2Category: '' };
    const [categoryData] = await this.categoryModel.find({ _id: category });
    if (!categoryData) {
      throw new HttpException('Продукты не найдены', HttpStatus.NOT_FOUND);
    }
    categories.category = categoryData.name;

    if (subCategory) {
      const [subCategoryData] = await this.subCategoryModel.find({
        _id: subCategory,
      });
      categories.subCategory = subCategoryData.name;
    }

    if (sub2Category) {
      const [sub2CategoryData] = await this.sub2CategoryModel.find({
        _id: sub2Category,
      });
      categories.sub2Category = sub2CategoryData.name;
    }

    const result = await this.productModel.findByIdAndUpdate(
      { _id },
      { ...categories, ...rest },
    );

    console.log(result);
    return;
  }
}
