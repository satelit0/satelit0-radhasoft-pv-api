import { Injectable } from '@nestjs/common';
import { CreateExistenceDto } from './dto/create-existence.dto';
import { UpdateExistenceDto } from './dto/update-existence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Existence } from './entities/existence.entity';
import { Repository } from 'typeorm';
import { IExistence } from 'src/models/interfaces/models.interface';

@Injectable()
export class ExistenceService {

  constructor(
    @InjectRepository(Existence) private existenceRepository: Repository<Existence>
  ) { }

  create(createExistenceDto: CreateExistenceDto) {
    const extitence = this.existenceRepository.create({ ...createExistenceDto });
    const newExistence = this.existenceRepository.save(extitence);
    return newExistence;
  }

  findAll(params: { subsidiaryId: number, isSadmin?: boolean }) {
    const { subsidiaryId, isSadmin } = params;
    if (isSadmin) {
      return this.existenceRepository.findAndCount({
        // where: { subsidiaryId },
        relations: {
          product: true,
        }
      });
    }

    return this.existenceRepository.findAndCount({
      where: { subsidiaryId },
      relations: {
        product: true,
      }
    });
  }

  findOne(id: number) {
    try {

      const existece = this.existenceRepository.findOne({ where: { id } });

      return existece;

    } catch (error) {

    }
  }

  findOneBy(params: IExistence) {
    return this.existenceRepository.findOne({
      where: { ...params },
      relations: {
        product: {
          category: true,
          description: true,
          suppliers: true,
        }
      }
    });
  }

  update(id: number, updateExistenceDto: UpdateExistenceDto) {
    const existence = this.existenceRepository.create({ ...updateExistenceDto });
    const existenceEdited = this.existenceRepository.update(id, existence);
    return existenceEdited;
  }

  remove(id: number, soft: boolean = true) {
    if (soft) return this.existenceRepository.softDelete(id);
    return this.existenceRepository.delete(id);
  }

  restore(id: number) {
    this.existenceRepository.restore(id);
  }
}
