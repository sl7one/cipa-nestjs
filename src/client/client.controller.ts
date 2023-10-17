import { Controller, Get, Post, Body } from '@nestjs/common';
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
    return this.clientService.createClient(dto);
  }
}
