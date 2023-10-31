import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productsProviders } from './schemas/product.providers';
import { CategoryService } from 'src/category/category.service';
import { categoriesProviders } from 'src/category/schemas/category.providers';
import { SubCategoryService } from 'src/subCategory/subCategory.service';
import { subCategoryProviders } from 'src/subCategory/schemas/subCategory.providers';
import { Sub2CategoryService } from 'src/sub2Category/sub2Category.service';
import { sub2CategoryProviders } from 'src/sub2Category/schemas/sub2Category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    ...productsProviders,
    CategoryService,
    ...categoriesProviders,
    SubCategoryService,
    ...subCategoryProviders,
    Sub2CategoryService,
    ...sub2CategoryProviders,
  ],
})
export class ProductsModule {}
