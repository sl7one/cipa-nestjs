/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { clientsProviders } from './schemas/client.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [ClientService, ...clientsProviders],
})
export class ClientsModule {}
