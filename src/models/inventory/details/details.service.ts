import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { Detail } from './entities/detail.entity';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(Detail) private readonly detailRepository: Repository<Detail>

  ) { }

  create(createDetailDto: CreateDetailDto, orderId: number) {
    try {
      const detail = this.detailRepository.create({ orderId, ...createDetailDto });
      const newDetail = this.detailRepository.save(detail);
      return newDetail;
    } catch (error) {

    }
  }

  findAll() {
    return `This action returns all details`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detail`;
  }

  update(id: number, updateDetailDto: UpdateDetailDto) {
    return `This action updates a #${id} detail`;
  }

  remove(id: number) {
    return `This action removes a #${id} detail`;
  }
}
