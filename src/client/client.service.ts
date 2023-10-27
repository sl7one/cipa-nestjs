/* eslint-disable prettier/prettier */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(
    @Inject('CLIENT_MODEL')
    private orderModel: Model<CreateClientDto>,
  ) {}

  async getClients(): Promise<CreateClientDto[]> {
    return await this.orderModel.find({}).sort({ date: -1 });
  }

  async createClient(client: CreateClientDto) {
    try {
      const data = await this.orderModel.create(client);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateClient(client: CreateClientDto) {
    try {
      const { _id, ...rest } = client;
      const data = await this.orderModel.findOneAndUpdate({ _id }, rest);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteClient(id: string) {
    try {
      const data = await this.orderModel.findByIdAndDelete(id);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
