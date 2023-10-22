/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/subCategory.dto';
import { SubCategoryService } from './subCategory.service';

@Controller('sub-categories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get()
  getSubCategory(): Promise<CreateSubCategoryDto[]> {
    return this.subCategoryService.getSubCategory();
  }

  @Post()
  addNewSubCategory(
    @Body() dto: CreateSubCategoryDto,
  ): Promise<CreateSubCategoryDto> {
    if (!Object.entries(dto).length)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty data',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.subCategoryService.addNewSubCategory(dto);
  }
}
