import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CreateCategoryProductDto } from './dto/create-category-product.dto';
import { UpdateCategoryProductDto } from './dto/update-category-product.dto';
import { FindOneParams } from '../../helpers/utils';
import { Http2ServerResponse } from 'http2';
import { ApiTags } from '@nestjs/swagger';

@Controller('category-product')
@ApiTags('Category-Product')

export class CategoryProductController {
  constructor(private readonly categoryProductService: CategoryProductService) {}

  @Post()
  create(@Body() createCategoryProductDto: CreateCategoryProductDto) {

    return this.categoryProductService.create(createCategoryProductDto);
  }

  @Get()
  findAll() {
    return this.categoryProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParams) {

    const catProduct = await this.categoryProductService.findOneById(id);

    if(!catProduct) throw new HttpException(`La categoria de producto con id: ${id} no existe`, HttpStatus.NOT_FOUND);

    return catProduct;
  }

  @Patch(':id')
  async update(@Param() {id}: FindOneParams, @Body() updateCategoryProductDto: UpdateCategoryProductDto) {
    const cat = await this.categoryProductService.findOneById(id);
    if (!cat) throw new HttpException(`La categoria de producto con id: ${id} no existe`, HttpStatus.NOT_FOUND);
    return this.categoryProductService.update(id, updateCategoryProductDto);
  }

  @Delete(':id')
  async remove(@Param() {id}: FindOneParams) {
    const catProduct = await this.categoryProductService.findOneById(id);
    if(!catProduct) throw new HttpException(`La categoria de producto con id: ${id} no existe`, HttpStatus.NOT_FOUND);
    return this.categoryProductService.remove(id);
  }
}
