import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { DescriptionService } from '../description/description.service';
import { ExistenceService } from '../existence/existence.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private descriptionService: DescriptionService,
    private existenceService: ExistenceService,

  ) { }

  async create(createProductDto: CreateProductDto) {

    const { description, existence, ...restDto } = createProductDto;

    const product = this.productRepository.create({ ...restDto });
    const newProduct = await this.productRepository.save(product);
    const { id } = newProduct;

    if ( existence ){
      const newExistence = await this.existenceService.create({...existence, productId: id,});
      // newProduct.existence = newExistence;
    }

    if (description && newProduct) {
      const newDescription = await this.descriptionService.create({ productId: id, ...description });
      newProduct.description = newDescription;
    }

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
    const product = this.productRepository.findOne({ where: { name } });
    return product;
  }

  findOne(id: number, withDeleted: boolean = false) {
    const product = this.productRepository.findOne({
      where: { id },
      withDeleted,
      relations: {
        category: true,
        description: true,
      }
    });
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    // const product = this.productRepository.create(updateProductDto);

    // const updateProduct = this.productRepository.update(id, product);

    // return updateProduct;
  }

  remove(id: number, soft: boolean = true) {

    if (soft) {
      return this.productRepository.softDelete(id);
    }

    const product = this.productRepository.create({ id });
    const removeProduct = this.productRepository.remove(product);

    return removeProduct;
  }

  restore(id: number) {
    return this.productRepository.restore(id);
  }
}
