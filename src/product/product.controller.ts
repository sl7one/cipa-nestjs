import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { SortIndexBody } from './types/types';
import { ParseObjectIdPipe } from 'src/pipes/objectId-pasre.pipe';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Promise<CreateProductDto[]> {
    return this.productService.getProducts();
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseObjectIdPipe)
    _id: string,
    @Body() dto: CreateProductDto,
  ): Promise<CreateProductDto[]> {
    return this.productService.updateProduct(_id, dto);
  }

  @Put()
  updateSortIndex(@Body() body: SortIndexBody) {
    return this.productService.updateSortIndex(body);
  }
}
