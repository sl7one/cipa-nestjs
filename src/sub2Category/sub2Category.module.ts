/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Sub2CategoryController } from './sub2Category.controller';
import { Sub2CategoryService } from './sub2Category.service';
import { sub2CategoryProviders } from './schemas/sub2Category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [Sub2CategoryController],
  providers: [Sub2CategoryService, ...sub2CategoryProviders],
})
export class Sub2CategoryModule {}
