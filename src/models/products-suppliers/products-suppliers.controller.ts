import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsSuppliersService } from './products-suppliers.service';
import { CreateProductsSupplierDto } from './dto/create-products-supplier.dto';
import { UpdateProductsSupplierDto } from './dto/update-products-supplier.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('products-suppliers')
@ApiTags('Producs-Suppliers')
export class ProductsSuppliersController {
  constructor(private readonly productsSuppliersService: ProductsSuppliersService) {}

  @Post()
  create(@Body() createProductsSupplierDto: CreateProductsSupplierDto) {
    return this.productsSuppliersService.create(createProductsSupplierDto);
  }

  @Get()
  findAll() {
    return this.productsSuppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsSuppliersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsSupplierDto: UpdateProductsSupplierDto) {
    return this.productsSuppliersService.update(+id, updateProductsSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsSuppliersService.remove(+id);
  }
}
