/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<CreateOrderDto>,
  ) {}

  async getOrders(): Promise<CreateOrderDto[]> {
    return await this.orderModel.find({}).sort({ date: -1 });
  }

  async getOrder(id: string): Promise<CreateOrderDto[]> {
    return await this.orderModel.find({ _id: id });
  }

  async createOrder(obj: CreateOrderDto) {
    const { order, ...rest } = obj;
    const totalByProduct = order.map((el) => ({
      ...el,
      total: el.order * el.price,
    }));
    const totalByOrders = totalByProduct.reduce(
      (acc, { total }) => (acc += total),
      0,
    );
    return await this.orderModel.create({
      ...rest,
      order: totalByProduct,
      total: totalByOrders,
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
