import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { DescriptionService } from './description.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { FindOneParams } from '../../../helpers/utils';
import { ApiTags } from '@nestjs/swagger';

@Controller('description-product')
@ApiTags('Description-Product')
export class DescriptionController {
  constructor(private readonly descriptionProductService: DescriptionService) { }

  @Post()
  async create(@Body() createDescriptionProductDto: CreateDescriptionDto) {
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
  async update(@Param() { id }: FindOneParams, @Body() updateDescriptionProductDto: UpdateDescriptionDto) {
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
