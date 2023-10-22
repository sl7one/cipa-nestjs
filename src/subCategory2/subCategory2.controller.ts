/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { SubCategory2Service } from './subCategory2.service';
import { CreateSubCategory2Dto } from './dto/subCategory2.dto';

@Controller('sub2-categories')
export class SubCategory2Controller {
  constructor(private readonly subCategory2Service: SubCategory2Service) {}

  @Get()
  getSubCategory(): Promise<CreateSubCategory2Dto[]> {
    return this.subCategory2Service.getSubCategory2();
  }

  // @Post()
  // addNewCatgery(
  //   @Body() dto: CreateSubCategoryDto,
  // ): Promise<CreateSubCategoryDto> {
  //   if (!Object.entries(dto).length)
  //     throw new HttpException(
  //       {
  //         statusCode: HttpStatus.BAD_REQUEST,
  //         error: 'Bad Request',
  //         message: 'Empty data',
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   return this.subCategoryService.addNewCatgery(dto);
  // }
}
