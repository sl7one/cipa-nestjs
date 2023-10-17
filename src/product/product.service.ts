/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<ProductDto>,
  ) {}

  async getProducts(): Promise<ProductDto[]> {
    return await this.productModel.find({});
  }
}
