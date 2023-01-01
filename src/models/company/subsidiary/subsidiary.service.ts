import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubsidiaryDto } from './dto/create-subsidiary.dto';
import { UpdateSubsidiaryDto } from './dto/update-subsidiary.dto';
import { Repository } from 'typeorm';
import { ISubsidiary } from 'src/models/interfaces/models.interface';
import { ProductsService } from '../../inventory/products/products.service';
import { Subsidiary } from './entities/subsidiary.entity';

@Injectable()
export class SubsidiaryService {

  constructor(
    @InjectRepository(Subsidiary) private subsidiaryRepository: Repository<Subsidiary>,
    @Inject(forwardRef( () => ProductsService ) )
    private productsService: ProductsService,
  ) {
  }

  create(createSubsidiaryDto: CreateSubsidiaryDto) {
    const subsidiary = this.subsidiaryRepository.create(createSubsidiaryDto);
    const newSubsidiary = this.subsidiaryRepository.save(subsidiary);
    return newSubsidiary;
  }

  findAll() {
    return this.subsidiaryRepository.find({
      relations: {
        companyBase: true,
        contact: true,
        device: true,
      }
    });
  }

  getAll(){
    return this.subsidiaryRepository.find();
  }

  findOne(id: number) {
    return this.subsidiaryRepository.findOne({
      where: { id },
      relations: {
        companyBase: { 
          contact: true,
        },
        contact: true,
      }
    });
  }
  
  findOneBy(params: ISubsidiary) {
    return this.subsidiaryRepository.findOne({
      where: { ...params },
      relations: {
        companyBase: { 
          contact: true,
        },
        contact: true,
      },
    });
  }

  findOneByName(name: string, withDeleted: boolean = false) {
    return this.subsidiaryRepository.findOne({
      where: { name },
      withDeleted,
      relations: {
        companyBase: { 
          contact: true,
        },
        contact: true,
      }
    });
  }
 
  update(id: number, updateSubsidiaryDto: UpdateSubsidiaryDto) {
    return this.subsidiaryRepository.update(id, updateSubsidiaryDto);
  }

  remove(id: number, soft: boolean = true) {
    if(soft) {
      return this.subsidiaryRepository.softDelete(id)
    };
    return this.subsidiaryRepository.delete(id);
  }
}
