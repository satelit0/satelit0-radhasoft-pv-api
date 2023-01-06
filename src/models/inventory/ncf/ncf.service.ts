import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNcfDto } from './dto/create-ncf.dto';
import { UpdateNcfDto } from './dto/update-ncf.dto';
import { Ncf } from './entities/ncf.entity';
import { Repository, DataSource } from 'typeorm';
import { TypeNCF } from '../../../helpers/enums';
import { compare } from 'bcrypt';

@Injectable()
export class NcfService {

  constructor(
    @InjectRepository(Ncf) private readonly ncfRepository: Repository<Ncf>,
    @Inject('DataSource') private dataSource: DataSource,
  ) { }

  async create(createNcfDto: CreateNcfDto) {

    const { typeNcf, subsidiaryId } = createNcfDto;
    const ncfExists = await  this.ncfRepository.findOne({ where: { typeNcf, subsidiaryId } });
    if (ncfExists) throw new HttpException(`Ya existe el tipo de comprabante: ${ typeNcf }`, 400);

    const ncf = this.ncfRepository.create({ ...createNcfDto });
    return this.ncfRepository.save(ncf);
  }

  findAll(subsidiaryId: number) {
    const ncfs = this.ncfRepository.find({
      where: { subsidiaryId }
    });
    return ncfs;
  }

  async getNumberNcfByType(typeNcf: TypeNCF, subsidiaryId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let ncf = new Ncf();
      let subsidiaryIdTarget = subsidiaryId;

      ncf = await queryRunner.manager.findOne(Ncf, { where: { typeNcf: typeNcf, subsidiaryId: subsidiaryIdTarget } });

      if (!ncf || ncf.sequence <= ncf.currentValueSequence || new Date() >= new Date(ncf.expirationDate)) {
        const ncfs = await queryRunner.manager.find(Ncf, { where: { typeNcf: typeNcf } });

        if (ncfs.length === 0) throw new HttpException(`No existen comprobantes resgistrados del tipo: ${typeNcf}, contacte el administrador`, 400);

        const ncfWithSubsidiaryId = ncfs.find(ncf => ncf.sequence > ncf.currentValueSequence && new Date() <= new Date(ncf.expirationDate));

        if (!ncfWithSubsidiaryId) throw new HttpException(`Número de comprobantes agotados. Contacte el administrador`, 400);

        subsidiaryIdTarget = ncfWithSubsidiaryId.subsidiaryId;
        ncf = await queryRunner.manager.findOne(Ncf, { where: { typeNcf: typeNcf, subsidiaryId: subsidiaryIdTarget } });
      }

      await queryRunner.manager.increment(Ncf, { typeNcf, subsidiaryId: subsidiaryIdTarget }, 'currentValueSequence', 1);

      const ncfNumber = `${ncf.serie}${ncf.typeNcf}${(ncf.currentValueSequence + 1).toString().padStart(8, '0')}`;

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
