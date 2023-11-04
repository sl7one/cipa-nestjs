import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Patch,
  Headers,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { ParseObjectIdPipe } from 'src/pipes/objectId-pasre.pipe';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(): Promise<CreateOrderDto[]> {
    return this.orderService.getOrders();
  }

  @Get(':id')
  getOrder(
    @Param('id', ParseObjectIdPipe)
    id: string,
  ) {
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
  createOrder(
    @Headers('authorization') authorization: string,
    @Body() dto: CreateOrderDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token]: string[] = authorization.split(' ');
    if (!Object.entries(dto).length)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty data',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.orderService.createOrder(dto, token);
  }

  @Put('salle/:id')
  salleOrder(
    @Param('id', ParseObjectIdPipe)
    id: string,
  ) {
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

  @Patch(':id')
  updateOrder(
    @Param('id', ParseObjectIdPipe)
    id: string,
    @Body() dto: CreateOrderDto,
  ) {
    if (!id || !Object.entries(dto).length)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty parametrs',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.orderService.updateOrder(id, dto);
  }

  @Delete(':id')
  deleteOrder(
    @Param('id', ParseObjectIdPipe)
    id: string,
  ) {
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
  unsalleOrder(
    @Param('id', ParseObjectIdPipe)
    id: string,
  ) {
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
