import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindOneParams } from '../../helpers/utils';
import { Repository } from 'typeorm';
import { ProductsSupplier } from '../products-suppliers/entities/products-supplier.entity';
import { ProductsSuppliersService } from '../products-suppliers/products-suppliers.service';
import { ApiTags } from '@nestjs/swagger';

const MSG = "Produto no existe",
      MSG_NAME_EXISTS = "Produto ya existe";


@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productsSupplierService: ProductsSuppliersService,
    ) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {

    const { name, supplierId } = createProductDto;
    
    const productCurr = await this.productsService.findByName(name);
    if (productCurr) throw new HttpException(`${MSG_NAME_EXISTS}: ${name}`, HttpStatus.BAD_REQUEST);

    const newProduc = await this.productsService.create(createProductDto);
    
    if (newProduc && supplierId) {
      await this.productsSupplierService.create({productId: newProduc.id, supplierId});
    }
    const newProductProdutSupplier = {...newProduc, supplierId};
    // return createProductDto;
    return newProductProdutSupplier;
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
    const product = await this.productsService.findOne(id, true);
    if (!product) throw new HttpException(MSG, 400);
    return await this.productsService.update(id, { deletedAt: null });
  }

}
