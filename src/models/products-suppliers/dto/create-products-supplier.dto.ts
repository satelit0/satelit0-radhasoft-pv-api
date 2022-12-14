import { OmitType } from '@nestjs/mapped-types';
import { ProductsSuppliersDto } from './products-suppliers-dto.ts';
export class CreateProductsSupplierDto extends OmitType(ProductsSuppliersDto, ['id', 'updatedAt', 'createdAt']){}
