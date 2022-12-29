import { Injectable } from '@nestjs/common';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Description } from './entities/description.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DescriptionService {

  constructor(
    @InjectRepository(Description)
    private descProductRepository: Repository<Description>,
  ) {
    
  }

  create(createDescriptionProductDto: CreateDescriptionDto) {

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

  update(id: number, updateDescriptionProductDto: UpdateDescriptionDto) {

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
