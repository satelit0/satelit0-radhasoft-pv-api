import { Injectable } from '@nestjs/common';
import { CreateDescriptionProductDto } from './dto/create-description-product.dto';
import { UpdateDescriptionProductDto } from './dto/update-description-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DescriptionProduct } from './entities/description-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DescriptionProductService {

  constructor(
    @InjectRepository(DescriptionProduct)
    private descProductRepository: Repository<DescriptionProduct>,
  ) {
    
  }

  create(createDescriptionProductDto: CreateDescriptionProductDto) {

    const descProd = this.descProductRepository.create(createDescriptionProductDto);
    const newDescProd = this.descProductRepository.save(descProd);
    // return descProd;
    return newDescProd;

  }

  findAll() {

    const descProduts = this.descProductRepository.findAndCount({
      relations: {
        product: true
      }
    });

    return descProduts;
  }

  findOne(id: number) {

    const descProduct = this.descProductRepository.findOne({where: {id}, relations: {product: true}});

    return  descProduct;
  }

  update(id: number, updateDescriptionProductDto: UpdateDescriptionProductDto) {

    const descProductEdit = this.descProductRepository.create(updateDescriptionProductDto);
    const descProductEdited  = this.descProductRepository.update(id, descProductEdit);

    return descProductEdited;
  }

  remove(id: number) {
    const desc = this.descProductRepository.create({id});
    const descProductRemove = this.descProductRepository.remove(desc);
    return descProductRemove;
  }
}
