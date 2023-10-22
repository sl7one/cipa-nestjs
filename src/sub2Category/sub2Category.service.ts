/* eslint-disable prettier/prettier */
import {
  Injectable,
  Inject,
  // HttpException,
  // HttpStatus
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSub2CategoryDto } from './dto/sub2Category.dto';

@Injectable()
export class Sub2CategoryService {
  constructor(
    @Inject('SUB2CATEGORY_MODEL')
    private sub2CategoryModel: Model<CreateSub2CategoryDto>,
  ) {}

  async getSub2Category(): Promise<CreateSub2CategoryDto[]> {
    return await this.sub2CategoryModel.find({});
  }
}
