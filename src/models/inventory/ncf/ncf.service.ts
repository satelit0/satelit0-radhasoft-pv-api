import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNcfDto } from './dto/create-ncf.dto';
import { UpdateNcfDto } from './dto/update-ncf.dto';
import { Ncf } from './entities/ncf.entity';
import { Repository } from 'typeorm';
import { TypeNCF } from '../../../helpers/enums';

@Injectable()
export class NcfService {

  constructor(
    @InjectRepository(Ncf) private readonly ncfRepository: Repository<Ncf>
  ) { }

  create(createNcfDto: CreateNcfDto) {
    const ncf = this.ncfRepository.create(createNcfDto);
    return this.ncfRepository.save(ncf);
  }

  findAll() {
    const ncfs = this.ncfRepository.find();
    return ncfs;
  }

  findOneNcf(typeNcf: TypeNCF) {

    return ;
  }

  findOne(id: number) {
    return `This action returns a #${id} ncf`;
  }

  update(id: number, updateNcfDto: UpdateNcfDto) {
    return `This action updates a #${id} ncf`;
  }

  remove(id: number) {
    return `This action removes a #${id} ncf`;
  }
}
