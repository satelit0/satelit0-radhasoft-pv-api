import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyBaseDto } from './dto/create-company-base.dto';
import { UpdateCompanyBaseDto } from './dto/update-company-base.dto';
import { CompanyBase } from './entities/company-base.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyBaseService {

  constructor(
    @InjectRepository(CompanyBase) private repositoryCompanyBase: Repository<CompanyBase>
  ){}

  create(createCompanyBaseDto: CreateCompanyBaseDto) {
    const newCompany  = this.repositoryCompanyBase.save(createCompanyBaseDto);
    return newCompany;
  }

  findAll() {
    const companys = this.repositoryCompanyBase.find({
      relations: {
        contact: true,
        subsidiary: true,
      }
    });
    return companys;
  }

  findOne(id: number) {

    const company = this.repositoryCompanyBase.findOne({
      where: {id},
      relations: {
        contact: true,
        subsidiary: true,
      }
    });

    return company;;
  }

  update(id: number, updateCompanyBaseDto: UpdateCompanyBaseDto) {

    const companyEdit = this.repositoryCompanyBase.update(id ,updateCompanyBaseDto);

    return companyEdit;
  }

  remove(id: number, soft: boolean = true) {

    if(soft) return this.repositoryCompanyBase.softDelete(id);

    return this.repositoryCompanyBase.delete(id);
  }
}
