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

const MSG = "Produto no existe",
  MSG_NAME_EXISTS = "Produto ya existe";


@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() req: IRequestWithUser) {

    const { name, supplierIds, subsidiaryId, description } = createProductDto;
    const { user } = req;
    !subsidiaryId ? (createProductDto.subsidiaryId = user.subsidiaryId) : null;
    
    console.log('+++++++++++++++>', createProductDto);

    const productCurr = await this.productsService.findByName(name);
    if (productCurr) throw new HttpException(`${MSG_NAME_EXISTS}: ${name}`, HttpStatus.BAD_REQUEST);

    // const newProduc = await this.productsService.create(createProductDto);

    // if (newProduc && supplierId) {
    // await this.productsSupplierService.create({productId: newProduc.id, supplierId});
    // }
    // const newProductProdutSupplier = {...newProduc, supplierId};
    // return createProductDto;
    // return newProductProdutSupplier;
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
