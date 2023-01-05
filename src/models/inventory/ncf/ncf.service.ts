import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNcfDto } from './dto/create-ncf.dto';
import { UpdateNcfDto } from './dto/update-ncf.dto';
import { Ncf } from './entities/ncf.entity';
import { Repository, DataSource } from 'typeorm';
import { TypeNCF } from '../../../helpers/enums';

@Injectable()
export class NcfService {

  constructor(
    @InjectRepository(Ncf) private readonly ncfRepository: Repository<Ncf>,
    @Inject('DataSource') private dataSource: DataSource,
  ) { }

  create(createNcfDto: CreateNcfDto) {
    const ncf = this.ncfRepository.create({ ...createNcfDto });
    return this.ncfRepository.save(ncf);
  }

  findAll(subsidiaryId: number) {
    const ncfs = this.ncfRepository.find({
      where: { subsidiaryId }
    });
    return ncfs;
  }

  async findOneByTypeNcf(typeNcf: TypeNCF, subsidiaryId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const ncf = await queryRunner.manager.findOne(Ncf, { where: { typeNcf: typeNcf, subsidiaryId } });

      
      if (!ncf) throw new HttpException(`No existen comprobantes de tipo: ${typeNcf}. Comuniquelo al administrador.`, 404);
      
      const currDate = new Date();
      const expitationDate = new Date(ncf.expirationDate);
      if (currDate <= expitationDate) {
        console.log('fecha:',);
      }

      await queryRunner.manager.increment(Ncf, { typeNcf, subsidiaryId, }, 'startSequence', 1);

      const ncfNumber = `${ncf.serie}${ncf.typeNcf}${(ncf.startSequence + 1).toString().padStart(8, '0')}`;

      await queryRunner.commitTransaction();
      return ncfNumber;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(`${error.message}`, error.status);
    } finally {
      await queryRunner.release();
    }
  }

  findOne(id: string, subsidiaryId: number) {
    const ncf = this.ncfRepository.findOne({ where: { id, subsidiaryId } });
    return ncf;
  }

  update(id: string, updateNcfDto: UpdateNcfDto) {
    const ncf = this.ncfRepository.create(updateNcfDto);
    return this.ncfRepository.update(id, ncf);
  }

  remove(id: string) {
    return this.ncfRepository.delete(id);
  }
}
