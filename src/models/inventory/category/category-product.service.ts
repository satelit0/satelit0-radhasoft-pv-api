import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private catProdRepository: Repository<Category>
    ) {
  }


  create(createCategoryProductDto: CreateCategoryDto) {

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

  update(id: number, updateCategoryProductDto: UpdateCategoryDto) {
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
