import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsSupplierDto } from './create-products-supplier.dto';

export class UpdateProductsSupplierDto extends PartialType(CreateProductsSupplierDto) {}
