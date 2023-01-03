import { Injectable } from '@nestjs/common';
import { CreateNcfDto } from './dto/create-ncf.dto';
import { UpdateNcfDto } from './dto/update-ncf.dto';

@Injectable()
export class NcfService {
  create(createNcfDto: CreateNcfDto) {
    return 'This action adds a new ncf';
  }

  findAll() {
    return `This action returns all ncf`;
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
