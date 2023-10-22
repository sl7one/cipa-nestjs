/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get()
  getLocations(): Promise<CreateCategoryDto[]> {
    return this.categoriesService.getCategories();
  }

  @Post()
  addNewCatgery(@Body() dto: CreateCategoryDto): Promise<CreateCategoryDto> {
    if (!Object.entries(dto).length)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty data',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.categoriesService.addNewCategory(dto);
  }
}
