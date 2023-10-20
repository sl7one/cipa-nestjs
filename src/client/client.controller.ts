import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { CreateClientDto } from './dto/client.dto';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getClients(): Promise<CreateClientDto[]> {
    return this.clientService.getClients();
  }

  @Post()
  createClient(@Body() dto: CreateClientDto) {
    if (!Object.entries(dto).length)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty data',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.clientService.createClient(dto);
  }

  @Patch()
  updateClient(@Body() dto: CreateClientDto) {
    return this.clientService.updateClient(dto);
  }
}
