/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
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
}
