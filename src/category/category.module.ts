import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { categoriesProviders } from './schemas/category.providers';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...categoriesProviders],
})
export class CategoryModule {}
