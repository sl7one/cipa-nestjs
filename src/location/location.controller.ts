import { Controller, Get } from '@nestjs/common';
import { CreateLocationDto } from './dto/location.dto';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  getLocations(): Promise<CreateLocationDto[]> {
    return this.locationService.getLocations();
  }
}
