import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ClientService } from 'src/client/client.service';
import { clientsProviders } from 'src/client/schemas/client.provider';
import { ProductService } from 'src/product/product.service';
import { productsProviders } from 'src/product/schemas/product.providers';
import { CategoryService } from 'src/category/category.service';
import { categoriesProviders } from 'src/category/schemas/category.providers';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { purchasesProviders } from './schemas/purchase.provider';
import { SubCategoryService } from 'src/subCategory/subCategory.service';
import { subCategoryProviders } from 'src/subCategory/schemas/subCategory.providers';
import { Sub2CategoryService } from 'src/sub2Category/sub2Category.service';
import { sub2CategoryProviders } from 'src/sub2Category/schemas/sub2Category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
    ...purchasesProviders,
    ProductService,
    ...productsProviders,
    ClientService,
    ...clientsProviders,
    CategoryService,
    ...categoriesProviders,
    SubCategoryService,
    ...subCategoryProviders,
    Sub2CategoryService,
    ...sub2CategoryProviders,
  ],
})
export class PurchasesModule {}
