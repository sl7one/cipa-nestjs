/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { locationsProviders } from './schemas/location.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LocationController],
  providers: [LocationService, ...locationsProviders],
})
export class LocationModule {}
