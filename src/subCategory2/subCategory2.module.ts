/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SubCategory2Controller } from './subCategory2.controller';
import { SubCategory2Service } from './subCategory2.service';
import { subCategory2Providers } from './schemas/subCategory2.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SubCategory2Controller],
  providers: [SubCategory2Service, ...subCategory2Providers],
})
export class SubCategory2Module {}
