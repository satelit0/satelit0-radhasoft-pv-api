import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category-product.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Http2ServerResponse } from 'http2';
import { ApiTags } from '@nestjs/swagger';
import { FindOneParams } from 'src/helpers/utils';

@Controller('category')
@ApiTags('Category')

export class CategoryController {
  constructor(private readonly categoryProductService: CategoryService) {}

  @Post()
  create(@Body() createCategoryProductDto: CreateCategoryDto) {

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
  async update(@Param() {id}: FindOneParams, @Body() updateCategoryProductDto: UpdateCategoryDto) {
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
