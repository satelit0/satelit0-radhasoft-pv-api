import { forwardRef, Inject, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubsidiaryDto } from './dto/create-subsidiary.dto';
import { UpdateSubsidiaryDto } from './dto/update-subsidiary.dto';
import { DataSource, Repository } from 'typeorm';
import { ISubsidiary } from 'src/models/interfaces/models.interface';
import { ProductService } from '../../inventory/products/product.service';
import { Subsidiary } from './entities/subsidiary.entity';
import { ExistenceService } from '../../inventory/existence/existence.service';
import { ContactService } from '../../contact/contact.service';
import { Contact } from '../../contact/entities/contact.entity';
import { DatabaseProviders } from '../../../database/database.providers';
import { Existence } from '../../inventory/existence/entities/existence.entity';

@Injectable()
export class SubsidiaryService {

  constructor(
    @InjectRepository(Subsidiary) private subsidiaryRepository: Repository<Subsidiary>,
    @Inject(forwardRef(() => ProductService))
    private productsService: ProductService,
    private existenceService: ExistenceService,
    private contactService: ContactService,
    @Inject('DataSource')
    private dataSource: DataSource,
  ) {
  }

  async create(createSubsidiaryDto: CreateSubsidiaryDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const { headquarters, contact, ...restCreateSubsidiaryDto } = createSubsidiaryDto;
      const product = await this.productsService.getAll();
      const productIds = product.map(prod => prod.id);

      if (headquarters) {
        await this.subsidiaryRepository.update({ headquarters: true }, { headquarters: false })
      }

      const newContact = new Contact();
      Object.assign(newContact, contact);
      const contactId = (await queryRunner.manager.save(newContact)).id;

      const subsidiary = this.subsidiaryRepository.create({ contactId, ...restCreateSubsidiaryDto });

      const newSubsidiary = await queryRunner.manager.save(subsidiary);

      const { id } = newSubsidiary;
      for (const productId of productIds) {
        const newExistence = new Existence();
        Object.assign(newExistence, {
          productId,
          dateEntry: new Date(),
          dateExpire: new Date(),
          qty: 0,
          subsidiaryId: id
        })
        await queryRunner.manager.save(newExistence);
      }

      await queryRunner.commitTransaction();

      return newSubsidiary;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(`imposible completar la acción solicitada: ${error.message}`, error.code);
    } finally {
      await queryRunner.release();
    }

  }

  findAll() {
    return this.subsidiaryRepository.find({
      // where:{existence: {subsidiaryId}},
      relations: {
        companyBase: true,
        contact: true,
        device: true,
      }
    });
  }

  getAll() {
    return this.subsidiaryRepository.find();
  }

  findOne(id: number) {
    return this.subsidiaryRepository.findOne({
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
    return this.subsidiaryRepository.findOne({
      where: { ...params },
      relations: {
        companyBase: {
          contact: true,
        },
        contact: true,
      },
    });
  }

  findOneByName(name: string, withDeleted: boolean = false) {
    return this.subsidiaryRepository.findOne({
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

  async update(id: number, updateSubsidiaryDto: UpdateSubsidiaryDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Todo: implementar el uso de transacciones
      return this.subsidiaryRepository.update(id, updateSubsidiaryDto);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(`imposible completar la acción solicitada: ${error.message}`, error.code);
    } finally {
      await queryRunner.release();
    }
  }

  remove(id: number, soft: boolean = true) {
    if (soft) {
      return this.subsidiaryRepository.softDelete(id)
    };
    return this.subsidiaryRepository.delete(id);
  }
}
