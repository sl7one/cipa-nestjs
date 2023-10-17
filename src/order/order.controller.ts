import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(): Promise<CreateOrderDto[]> {
    return this.orderService.getOrders();
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @Patch(':id')
  updateOrder(@Param('id') id: string) {
    return this.orderService.updateOrder(id);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
