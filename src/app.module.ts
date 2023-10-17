import { Module } from '@nestjs/common';
import { OrdersModule } from './order/order.module';
import { ProductsModule } from './product/product.module';
import { LocationModule } from './location/location.module';
import { ClientsModule } from './client/client.module';

@Module({
  imports: [OrdersModule, ProductsModule, LocationModule, ClientsModule],
})
export class AppModule {}
