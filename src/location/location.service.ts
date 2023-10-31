import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(
    @Inject('LOCATION_MODEL')
    private locationModel: Model<CreateLocationDto>,
  ) {}

  async getLocations(): Promise<CreateLocationDto[]> {
    return await this.locationModel.find({});
  }

  async addNewLocation(body: CreateLocationDto) {
    try {
      const data = await this.locationModel.create(body);
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
