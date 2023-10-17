/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ordersProviders } from './order.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, ...ordersProviders],
})
export class OrdersModule {}
