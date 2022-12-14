import { Injectable } from '@nestjs/common';
import { CreateProductsSupplierDto } from './dto/create-products-supplier.dto';
import { UpdateProductsSupplierDto } from './dto/update-products-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsSupplier } from './entities/products-supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsSuppliersService {

  constructor(
    @InjectRepository(ProductsSupplier) private productSuplierRepository: Repository<ProductsSupplier>
  ) {
  }

  create(createProductsSupplierDto: CreateProductsSupplierDto) {
    const productSupplier = this.productSuplierRepository.create(createProductsSupplierDto);
    return this.productSuplierRepository.save(productSupplier);
  }

  findAll() {
    const productsSupliers = this.productSuplierRepository.find({
      relations: {
        product: true,
        supplier: true,
      },
    });

    return productsSupliers;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsSupplier`;
  }

  update(id: number, updateProductsSupplierDto: UpdateProductsSupplierDto) {
    const productSupplier = this.productSuplierRepository.create(updateProductsSupplierDto);

    const productSuplierEdited = this.productSuplierRepository.update(id, productSupplier);

    return productSuplierEdited;
  }

  remove(id: number) {
    const productSupplier = this.productSuplierRepository.create({id});
    const remoded = this.productSuplierRepository.remove(productSupplier);
    return remoded;
  }
}
