import {
  PipeTransform,
  Injectable,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Types, isObjectIdOrHexString } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, any> {
  transform(value: Types.ObjectId): Types.ObjectId {
    const validObjectId: boolean = isObjectIdOrHexString(value);
    if (!validObjectId) {
      throw new BadRequestException({
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: 'Invalid ObjectId',
        error: 'Bad Request',
      });
    }

    return new Types.ObjectId(value);
  }
}
