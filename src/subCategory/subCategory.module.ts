/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SubCategoryController } from './subCategory.controller';
import { SubCategoryService } from './subCategory.service';
import { subCategoryProviders } from './schemas/subCategory.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, ...subCategoryProviders],
})
export class SubCategoryModule {}
