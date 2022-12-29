import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindOneParams } from '../../../helpers/utils';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { IRequestWithUser, ITokenPayload } from 'src/models/interfaces/models.interface';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { use } from 'passport';
import { DescriptionService } from '../description/description.service';
import { CreateDescriptionDto } from '../description/dto/create-description.dto';

const MSG = "Produto no existe",
  MSG_NAME_EXISTS = "Produto ya existe";


@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly descriptionService: DescriptionService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() req: IRequestWithUser) {

    const { name, existence } = createProductDto;

    const { user } = req;
    const { subsidiaryId } = existence;

    !subsidiaryId || subsidiaryId == 0 ? (existence.subsidiaryId = user.subsidiaryId) : null;
    
    const productCurr = await this.productsService.findByName(name);
    if (productCurr) throw new HttpException(`${MSG_NAME_EXISTS}: ${name}`, HttpStatus.BAD_REQUEST);

    const newProduct = await this.productsService.create(createProductDto);

    return newProduct;
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParams) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new HttpException(MSG, 404);

    return product;
  }

  @Patch(':id')
  async update(@Param() { id }: FindOneParams, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new HttpException(`${MSG}`, 400);
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete('removesoft/:id')
  async removeSoft(@Param() { id }: FindOneParams) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new HttpException(MSG, 400);
    return await this.productsService.remove(id);
  }

  @Delete(':id')
  async remove(@Param() { id }: FindOneParams) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new HttpException(MSG, 400);
    return await this.productsService.remove(id);
  }

  @Patch('restore/:id')
  async restoreById(@Param() { id }: FindOneParams) {
    return await this.productsService.restore(id);
  }

}
