import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { OrdersModule } from './order/order.module';
import { ProductsModule } from './product/product.module';
import { LocationModule } from './location/location.module';
import { ClientsModule } from './client/client.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subCategory/subCategory.module';
import { Sub2CategoryModule } from './sub2Category/sub2Category.module';
import { AuthModule } from './auth/auth.module';
import { OrderController } from './order/order.controller';
import { ProductController } from './product/product.controller';
import { LocationController } from './location/location.controller';
import { ClientController } from './client/client.controller';
import { CategoryController } from './category/category.controller';
import { SubCategoryController } from './subCategory/subCategory.controller';
import { Sub2CategoryController } from './sub2Category/sub2Category.controller';
import { AuthController } from './auth/auth.controller';
import { verifyToken } from './auth/verifyToken';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    LocationModule,
    ClientsModule,
    CategoryModule,
    SubCategoryModule,
    Sub2CategoryModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifyToken)
      .exclude(
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes(
        OrderController,
        ProductController,
        LocationController,
        ClientController,
        CategoryController,
        SubCategoryController,
        Sub2CategoryController,
        AuthController,
      );
  }
}
