import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { of } from 'rxjs';
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

  findAll(subsidiaryId: number) {
    return this.detailRepository.findAndCount({
      where: { order: { subsidiaryId } },
      relations: {
        order: true,
      }
    });
  }

  findOne(id: number, subsidiaryId: number) {
    const detail = this.detailRepository.findOne({
      where: {
        id, order: { subsidiaryId }
      },
      relations: {
        order: true,
      }
    },);

    return detail;
  }

  async getTotalDetails(orderId: number) {
    let result = await this.detailRepository.manager.query(`SELECT  SUM((d.price * d.qty)) total FROM detail d 
    WHERE "orderId" = $1`, [orderId]);

    if (!result || result.length === 0) return 0;

    result = result[0];
    const total = Number(result.total);

    return total;
  }

  update(id: number, updateDetailDto: UpdateDetailDto) {
    return `This action updates a #${id} detail`;
  }

  remove(id: number) {
    return `This action removes a #${id} detail`;
  }
}
