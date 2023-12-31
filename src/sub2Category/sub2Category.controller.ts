import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Sub2CategoryService } from './sub2Category.service';
import { CreateSub2CategoryDto } from './dto/sub2Category.dto';

@Controller('sub-2-categories')
export class Sub2CategoryController {
  constructor(private readonly sub2CategoryService: Sub2CategoryService) {}

  @Get()
  getSub2Category(): Promise<CreateSub2CategoryDto[]> {
    return this.sub2CategoryService.getSub2Category();
  }

  @Post()
  addNewSubCategory(
    @Body() dto: CreateSub2CategoryDto,
  ): Promise<CreateSub2CategoryDto> {
    if (!Object.entries(dto).length)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Empty data',
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.sub2CategoryService.addNewSub2Category(dto);
  }
}
