import { Module } from '@nestjs/common';
import { OrdersModule } from './order/order.module';
import { ProductsModule } from './product/product.module';
import { LocationModule } from './location/location.module';
import { ClientsModule } from './client/client.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subCategory/subCategory.module';
import { Sub2CategoryModule } from './sub2Category/sub2Category.module';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    LocationModule,
    ClientsModule,
    CategoryModule,
    SubCategoryModule,
    Sub2CategoryModule,
  ],
})
export class AppModule {}
