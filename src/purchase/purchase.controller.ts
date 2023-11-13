import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/purchase.dto';
import { ParseObjectIdPipe } from 'src/pipes/objectId-pasre.pipe';
import { PurchaseService } from './purchase.service';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  getOrders(): Promise<CreatePurchaseDto[]> {
    return this.purchaseService.getOrders();
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
    return this.purchaseService.getOrder(id);
  }

  @Post()
  createOrder(@Body() dto: CreatePurchaseDto) {
    if (!Object.entries(dto).length)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty data',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.purchaseService.createOrder(dto);
  }

  @Patch(':id')
  updateOrder(
    @Param('id', ParseObjectIdPipe)
    id: string,
    @Body() dto: CreatePurchaseDto,
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
    return this.purchaseService.updateOrder(id, dto);
  }

  @Delete(':id')
  deleteOrder(
    @Param('id')
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
    return this.purchaseService.deleteOrder(id);
  }
}
