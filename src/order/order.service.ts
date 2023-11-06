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

    @Inject('USERS_MODEL')
    private userModel: Model<CreateLocationDto>,
  ) {}

  async getOrders(): Promise<CreateOrderDto[]> {
    return await this.orderModel.find({}).lean().sort({ date: -1 });
  }

  async getOrder(_id: string): Promise<CreateOrderDto[]> {
    return await this.orderModel.find({ _id }).lean();
  }

  async createOrder(body: CreateOrderDto, token: string) {
    const { order, client: client_id, location: location_id, ...rest } = body;

    const productsIds = order.map(({ _id }) => _id);

    const productsArr = await this.productModel
      .find({
        _id: { $in: productsIds },
      })
      .lean();

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
          .quantity,
        total:
          order.find((item) => item._id.toString() === _id.toString()).price *
          order.find((item) => item._id.toString() === _id.toString()).quantity,
      };
    });

    const totalByOrdersArr = ordersArray.reduce(
      (acc, { total }) => (acc += total),
      0,
    );

    const client = await this.clientModel.findOne({ _id: client_id }).lean();
    if (!client) {
      throw new HttpException('Клиент не найден', HttpStatus.NOT_FOUND);
    }

    const location = location_id
      ? await this.locationModel
          .findOne({
            _id: location_id,
          })
          .lean()
      : '';

    const owner = await this.userModel.findOne({ token }).lean();

    const res = await this.orderModel.create({
      ...rest,
      total: totalByOrdersArr,
      order: ordersArray,
      client,
      location,
      owner,
    });

    return res;
  }

  async deleteOrder(id: string) {
    const ids = id.split(',').map((id) => id);

    const res = await this.orderModel.deleteMany({ _id: { $in: ids } });
    return { ...res, id: ids };
  }

  async updateOrder(_id: string, payload: CreateOrderDto) {
    const {
      order,
      client: client_id,
      location: location_id,
      ...rest
    } = payload;

    const productsIds = order.map(({ _id }) => _id);
    const productsArr = await this.productModel
      .find({
        _id: { $in: productsIds },
      })
      .lean();

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
          .quantity,
        total:
          order.find((item) => item._id.toString() === _id.toString()).price *
          order.find((item) => item._id.toString() === _id.toString()).quantity,
      };
    });
    const totalByOrdersArr = ordersArray.reduce(
      (acc, { total }) => (acc += total),
      0,
    );

    const client = await this.clientModel.findOne({ _id: client_id });
    if (!client) {
      throw new HttpException('Клиент не найден', HttpStatus.NOT_FOUND);
    }

    const location = location_id
      ? await this.locationModel.findOne({
          _id: location_id,
        })
      : '';
    const res = await this.orderModel.findByIdAndUpdate(
      { _id },
      {
        order: ordersArray,
        client,
        location: location ? location.location : '',
        total: totalByOrdersArr,
        ...rest,
      },
      {
        returnDocument: 'after',
      },
    );
    return res;
  }

  async salleOrder(id: string) {
    const ids = id.split(',').map((id) => id);

    const res = await this.orderModel.updateMany(
      { _id: { $in: ids } },
      { isActive: false },
    );
    return { ...res, id: ids };
  }

  async unsalleOrder(_id: string) {
    const res = await this.orderModel.findByIdAndUpdate(
      { _id },
      { isActive: true },
      { returnDocument: 'after' },
    );
    return res;
  }
}
