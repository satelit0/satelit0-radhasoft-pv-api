import { Injectable } from '@nestjs/common';
import { CreateSubsidiaryExistenceDto } from './dto/create-existence.dto';
import { UpdateSubsidiaryExistenceDto } from './dto/update-existence.dto';

@Injectable()
export class ExistenceService {
  create(createSubsidiaryExistenceDto: CreateSubsidiaryExistenceDto) {
    return 'This action adds a new subsidiaryExistence';
  }

  findAll() {
    return `This action returns all subsidiaryExistence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subsidiaryExistence`;
  }

  update(id: number, updateSubsidiaryExistenceDto: UpdateSubsidiaryExistenceDto) {
    return `This action updates a #${id} subsidiaryExistence`;
  }

  remove(id: number) {
    return `This action removes a #${id} subsidiaryExistence`;
  }
}
