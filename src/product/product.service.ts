import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/product.dto';
import { CreateCategoryDto } from '../category/dto/category.dto';
import { CreateSubCategoryDto } from '../subCategory/dto/subCategory.dto';
import { CreateSub2CategoryDto } from '../sub2Category/dto/sub2Category.dto';
import { SortIndexBody } from './types/types';

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
    return await this.productModel.find({}).sort([['sortIndex', 'asc']]);
  }

  async updateProduct(
    _id: string,
    body: CreateProductDto,
  ): Promise<CreateProductDto[]> {
    const { category, subCategory = null, sub2Category = null, ...rest } = body;

    const categories = { category: '', subCategory: '', sub2Category: '' };
    const [categoryData] = await this.categoryModel.find({ _id: category });
    if (!categoryData) {
      throw new HttpException('Категория не найдена', HttpStatus.NOT_FOUND);
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

    const result: CreateProductDto[] =
      await this.productModel.findByIdAndUpdate(
        { _id },
        { ...categories, ...rest },
        { returnDocument: 'after' },
      );

    return result;
  }

  async updateSortIndex(body: SortIndexBody): Promise<CreateProductDto[]> {
    const { less, more } = body;
    const res1 = await this.productModel.findOneAndUpdate(
      { _id: less.productId },
      { sortIndex: more.sortIndex },
      { returnDocument: 'after' },
    );
    const res2 = await this.productModel.findOneAndUpdate(
      { _id: more.productId },
      { sortIndex: less.sortIndex },
      { returnDocument: 'after' },
    );
    return [res1, res2];
  }
}
