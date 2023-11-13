import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePurchaseDto } from './dto/purchase.dto';
import { CreateClientDto } from 'src/client/dto/client.dto';
import { CreateProductDto } from 'src/product/dto/product.dto';
import { CreateCategoryDto } from 'src/category/dto/category.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('PURCHASE_MODEL')
    private purchaseModel: Model<CreatePurchaseDto>,

    @Inject('CLIENT_MODEL')
    private clientModel: Model<CreateClientDto>,

    @Inject('PRODUCT_MODEL')
    private productModel: Model<CreateProductDto>,

    @Inject('CATEGORY_MODEL')
    private categoryModel: Model<CreateCategoryDto>,
  ) {}

  async getOrders(): Promise<CreatePurchaseDto[]> {
    return await this.purchaseModel.find({}).lean().sort({ date: -1 });
  }

  async getOrder(_id: string): Promise<CreatePurchaseDto[]> {
    return await this.purchaseModel.find({ _id }).lean();
  }

  async createOrder(body: CreatePurchaseDto) {
    const { order, client: client_id, ...rest } = body;

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

    const res = await this.purchaseModel.create({
      ...rest,
      total: totalByOrdersArr,
      order: ordersArray,
      client,
    });

    return res;
  }

  async deleteOrder(id: string) {
    const ids = id.split(',').map((id) => id);

    const res = await this.purchaseModel.deleteMany({ _id: { $in: ids } });
    return { ...res, id: ids };
  }

  async updateOrder(_id: string, payload: CreatePurchaseDto) {
    const { order, client: client_id, ...rest } = payload;

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

    const res = await this.purchaseModel.findByIdAndUpdate(
      { _id },
      {
        order: ordersArray,
        client,
        total: totalByOrdersArr,
        ...rest,
      },
      {
        returnDocument: 'after',
      },
    );
    return res;
  }
}
