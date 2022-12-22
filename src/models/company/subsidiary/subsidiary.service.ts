import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubsidiaryDto } from './dto/create-subsidiary.dto';
import { UpdateSubsidiaryDto } from './dto/update-subsidiary.dto';
import { Subsidiary } from './entities/subsidiary.entity';
import { Repository } from 'typeorm';
import { ISubsidiary } from 'src/models/interfaces/models.interface';

@Injectable()
export class SubsidiaryService {

  constructor(
    @InjectRepository(Subsidiary) private repositorySubsidiary: Repository<Subsidiary>
  ) {
  }


  create(createSubsidiaryDto: CreateSubsidiaryDto) {
    const subsidiary = this.repositorySubsidiary.create(createSubsidiaryDto);
    const newSubsidiary = this.repositorySubsidiary.save(subsidiary);
    return newSubsidiary;
  }

  findAll() {
    return this.repositorySubsidiary.find({
      relations: {
        companyBase: true,
        contact: true,
        device: true,
      }
    });
  }

  findOne(id: number) {
    return this.repositorySubsidiary.findOne({
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
    return this.repositorySubsidiary.findOne({
      where: { ...params },
      relations: {
        companyBase: { 
          contact: true,
        },
        contact: true,
      }
    });
  }

  findOneByName(name: string, withDeleted: boolean = false) {
    return this.repositorySubsidiary.findOne({
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
    return this.repositorySubsidiary.update(id, updateSubsidiaryDto);
  }

  remove(id: number, soft: boolean = true) {
    if(soft) {
      return this.repositorySubsidiary.softDelete(id)
    };
    return this.repositorySubsidiary.delete(id);
  }
}
