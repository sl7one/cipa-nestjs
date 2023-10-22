import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Promise<CreateProductDto[]> {
    return this.productService.getProducts();
  }

  @Patch(':id')
  updateProduct(
    @Param('id') _id: string,
    @Body() dto: CreateProductDto,
  ): Promise<CreateProductDto[]> {
    return this.productService.updateProduct(_id, dto);
  }
}
