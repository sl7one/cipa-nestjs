/* eslint-disable prettier/prettier */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/order.dto';
import { CreateClientDto } from 'src/client/dto/client.dto';
import { CreateProductDto } from 'src/product/dto/product.dto';
import { CreateLocationDto } from 'src/location/dto/location.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<CreateOrderDto>,

    @Inject('CLIENT_MODEL')
    private clientModel: Model<CreateClientDto>,

    @Inject('PRODUCT_MODEL')
    private productModel: Model<CreateProductDto>,

    @Inject('LOCATION_MODEL')
    private locationModel: Model<CreateLocationDto>,
  ) {}

  async getOrders(): Promise<CreateOrderDto[]> {
    return await this.orderModel.find({}).sort({ date: -1 });
  }

  async getOrder(id: string): Promise<CreateOrderDto[]> {
    return await this.orderModel.find({ _id: id });
  }

  async createOrder(obj: CreateOrderDto) {
    const { order, client: client_id, location: location_id, ...rest } = obj;

    const productsIds = order.map(({ _id }) => _id);

    const productsArr = await this.productModel.find({
      _id: { $in: productsIds },
    });

    if (!productsArr) {
      throw new HttpException('Продукты не найдены', HttpStatus.NOT_FOUND);
    }

    const ordersArray = productsArr.map(({ _id, ...rest }) => {
      return {
        _id,
        ...rest,
        price: order.find((item) => item._id.toString() === _id.toString())
          .price,
        quantity: order.find((item) => item._id.toString() === _id.toString())
          .order,
        total:
          order.find((item) => item._id.toString() === _id.toString()).order *
          order.find((item) => item._id.toString() === _id.toString()).price,
      };
    });

    const totalByOrdersArr = ordersArray.reduce(
      (acc, { total }) => (acc += total),
      0,
    );

    const clientArr = await this.clientModel.find({ _id: client_id });
    if (!clientArr || !clientArr.length) {
      throw new HttpException('Клиент не найден', HttpStatus.NOT_FOUND);
    }
    const [clientData] = clientArr;

    const [location] = await this.locationModel.find({
      _id: location_id,
    });

    const res = await this.orderModel.create({
      ...rest,
      order: ordersArray,
      total: totalByOrdersArr,
      client: clientData,
      location: location ? location.location : '',
    });

    return res;
  }

  async deleteOrder(id: string) {
    const ids = id.split(',').map((id) => id);

    const res = await this.orderModel.deleteMany({ _id: { $in: ids } });
    return { ...res, id: ids };
  }

  async updateOrder(id: string) {
    const ids = id.split(',').map((id) => id);

    const res = await this.orderModel.updateMany(
      { _id: { $in: ids } },
      { isActive: false },
    );
    return { ...res, id: ids };
  }
}
