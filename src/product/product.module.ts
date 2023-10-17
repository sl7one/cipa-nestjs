/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productsProviders } from './product.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...productsProviders],
})
export class ProductsModule {}
