/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ordersProviders } from './schemas/order.provider';
import { ClientService } from 'src/client/client.service';
import { clientsProviders } from 'src/client/schemas/client.provider';
import { ProductService } from 'src/product/product.service';
import { productsProviders } from 'src/product/schemas/product.providers';
import { LocationService } from 'src/location/location.service';
import { locationsProviders } from 'src/location/schemas/location.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    ...ordersProviders,
    ProductService,
    ...productsProviders,
    ClientService,
    ...clientsProviders,
    LocationService,
    ...locationsProviders,
  ],
})
export class OrdersModule {}
