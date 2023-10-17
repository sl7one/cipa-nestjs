import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Promise<CreateProductDto[]> {
    return this.productService.getProducts();
  }
}
