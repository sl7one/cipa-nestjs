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
    const { order, client, location, ...rest } = obj;

    const productsIds = order.map(({ product }) => product);

    const productsArr = await this.productModel.find({
      _id: { $in: productsIds },
    });

    if (!productsArr) {
      throw new HttpException('Продукты не найдены', HttpStatus.NOT_FOUND);
    }

    const ordersArray = productsArr.map((el) => ({
      ...el,
      total:
        order.find((item) => item.product === el._id).order *
        order.find((item) => item.product === el._id).price,
    }));

    const totalByOrdersArr = ordersArray.reduce(
      (acc, { total }) => (acc += total),
      0,
    );

    const clientObj = await this.clientModel.find({ _id: client._id });
    if (!clientObj) {
      throw new HttpException('Клиент не найден', HttpStatus.NOT_FOUND);
    }

    const locationObj = await this.locationModel.find({ _id: location._id });
    if (!locationObj) {
      throw new HttpException('Локация не найдена', HttpStatus.NOT_FOUND);
    }

    return await this.orderModel.create({
      ...rest,
      order: ordersArray,
      total: totalByOrdersArr,
      client: clientObj,
      location: locationObj,
    });
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
