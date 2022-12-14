import { Injectable } from '@nestjs/common';
import { CreateCategoryProductDto } from './dto/create-category-product.dto';
import { UpdateCategoryProductDto } from './dto/update-category-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryProduct } from './entities/category-product.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CategoryProductService {

  constructor(
    @InjectRepository(CategoryProduct)
    private catProdRepository: Repository<CategoryProduct>
    ) {
  }


  create(createCategoryProductDto: CreateCategoryProductDto) {

    const catProd = this.catProdRepository.create(createCategoryProductDto); 
    const newCatProd = this.catProdRepository.save(catProd);

    return newCatProd;
  }

  findAll() {
    const catProducts = this.catProdRepository.find({
      loadRelationIds: true
    });
    return catProducts;
  }

  findOneById(id: number) {

    const catPrduct = this.catProdRepository.findOne({ where: {id}});
    return catPrduct;
  }

  findOneByName(name: string) {

    const catPrduct = this.catProdRepository.findOne({ where: {name}});

    return catPrduct;
  }

  findByname(name: string) {

    const catPrducts = this.catProdRepository.findBy({ name: Like(`%${name}`)});

    return catPrducts;
  }

  update(id: number, updateCategoryProductDto: UpdateCategoryProductDto) {
    const catEdit = this.catProdRepository.create(updateCategoryProductDto);
    const catEdited = this.catProdRepository.update(id, catEdit);
    return catEdited;
  }

  remove(id: number) {
    const cat = this.catProdRepository.create({id});
    const catRemove = this.catProdRepository.remove(cat);
    return catRemove;
  }
}
