import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  // Patch,
  HttpException,
  HttpStatus,
  Put,
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
    if (!id)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty parametrs',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.orderService.getOrder(id);
  }

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    if (!Object.entries(dto).length)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty data',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.orderService.createOrder(dto);
  }

  @Put('salle/:id')
  salleOrder(@Param('id') id: string) {
    if (!id)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty parametrs',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.orderService.salleOrder(id);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    if (!id)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty parametrs',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.orderService.deleteOrder(id);
  }

  @Put('unsalle/:id')
  unsalleOrder(@Param('id') id: string) {
    if (!id)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty parametrs',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.orderService.unsalleOrder(id);
  }
}
