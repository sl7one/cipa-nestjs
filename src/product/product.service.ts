/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<CreateProductDto>,
  ) {}

  async getProducts(): Promise<CreateProductDto[]> {
    return await this.productModel.find({});
  }
}
