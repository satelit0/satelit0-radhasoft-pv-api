import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { DescriptionProductService } from './description-product.service';
import { CreateDescriptionProductDto } from './dto/create-description-product.dto';
import { UpdateDescriptionProductDto } from './dto/update-description-product.dto';
import { FindOneParams } from '../../helpers/utils';

@Controller('description-product')
export class DescriptionProductController {
  constructor(private readonly descriptionProductService: DescriptionProductService) { }

  @Post()
  async create(@Body() createDescriptionProductDto: CreateDescriptionProductDto) {
    return await this.descriptionProductService.create(createDescriptionProductDto);
  }

  @Get()
  async findAll() {
    return await this.descriptionProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParams) {
    return await this.descriptionProductService.findOne(id);
  }

  @Patch(':id')
  async update(@Param() { id }: FindOneParams, @Body() updateDescriptionProductDto: UpdateDescriptionProductDto) {
    return await this.descriptionProductService.update(id, updateDescriptionProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param() { id }: FindOneParams) {
    const descExits = await this.descriptionProductService.findOne(id);
    if (!descExits) throw new HttpException(`La descripción con id: ${id}, no existe`, HttpStatus.NOT_FOUND);

    const desc = await this.descriptionProductService.remove(id);
    return desc;
  }
}
