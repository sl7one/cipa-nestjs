import { Module } from '@nestjs/common';
import { OrdersModule } from './order/order.module';
import { ProductsModule } from './product/product.module';

@Module({
  imports: [OrdersModule, ProductsModule],
})
export class AppModule {}
