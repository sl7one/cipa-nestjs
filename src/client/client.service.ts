/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
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
    return await this.orderModel.create(client);
  }
}
