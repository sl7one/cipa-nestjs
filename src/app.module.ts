import { Module } from '@nestjs/common';
import { OrdersModule } from './order/order.module';
import { ProductsModule } from './product/product.module';
import { LocationModule } from './location/location.module';
import { ClientsModule } from './client/client.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subCategory/subCategory.module';
import { SubCategory2Module } from './subCategory2/subCategory2.module';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    LocationModule,
    ClientsModule,
    CategoryModule,
    SubCategoryModule,
    SubCategory2Module,
  ],
})
export class AppModule {}
