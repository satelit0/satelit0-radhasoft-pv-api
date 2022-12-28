import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  create(createProductDto: CreateProductDto) {

    const product = this.productRepository.create(createProductDto);
    const newProduct = this.productRepository.save(product);

    return newProduct;
  }

  findAll() {

    const products = this.productRepository.findAndCount({
      relations: {
        category: true,
        description: true,
      },
      order: {
        id: 'ASC', name: 'ASC'
      }
    });

    return products;
  }

  findByName(name: string) {
    const product = this.productRepository.findOne({where: {name}});
    return product;
  }
  
  findOne(id: number, withDeleted: boolean = false) {
    const product = this.productRepository.findOne({
      where: {id}, 
      withDeleted,
      relations:{
        category: true,
        description: true,
      } 
    });
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.productRepository.create(updateProductDto);

    const updateProduct = this.productRepository.update(id, product);

    return updateProduct;
  }

  remove(id: number, soft: boolean = true) {

    if (soft) {
      return this.productRepository.softDelete(id);
    }

    const product = this.productRepository.create({id});
    const removeProduct = this.productRepository.remove(product);

    return removeProduct;
  }
}
