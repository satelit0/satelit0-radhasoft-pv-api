import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { Contact } from '../../contact/entities/contact.entity';
import { Person } from '../../person/entities/person.entity';

@Injectable()
export class SupplierService {

  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @Inject('DataSource') private dataSource: DataSource
  ) {

  }

  async create(createSupplierDto: CreateSupplierDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const { person, ...restCreateSupplierDto } = createSupplierDto;
      const { contact, ...restCreatePersonDto } = person;

      const newContact = new Contact();
      Object.assign(newContact, contact);
      const contactId = (await queryRunner.manager.save(newContact)).id;

      const newPerson = new Person();
      Object.assign(newPerson, { contactId, ...restCreatePersonDto });
      const personId = (await queryRunner.manager.save(newPerson)).id;

      const supplier = new Supplier();
      Object.assign(supplier, { personId, ...restCreateSupplierDto });

      const newSupplier = queryRunner.manager.save(supplier);

      await queryRunner.commitTransaction();
      return newSupplier;

    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    const supplier = this.supplierRepository.find({
      relations: {
        person: true,
        // suppliersProducts: true,
      },
      order: { id: 'ASC', nameEntity: 'ASC' }
    });

    return supplier;
  }

  findOne(id: number, withDeleted: boolean = false) {
    return this.supplierRepository.findOne({
      where: { id },
      withDeleted,
      relations: {
        person: true,
        // suppliersProducts: {
        //   product: true
        // }
      }
    });
  }

  findOneByNameEntity(nameEntity: string) {
    return this.supplierRepository.findOne({ where: { nameEntity } });
  }

  findOneByRnc(rnc: string) {
    return this.supplierRepository.findOne({ where: { rnc } });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {

    const supplier = this.supplierRepository.create(updateSupplierDto);

    const supplierEdited = this.supplierRepository.update(id, supplier);

    return supplierEdited;
  }

  remove(id: number, soft: boolean = true) {

    if (soft) return this.supplierRepository.softDelete(id);

    const supplierDelete = this.supplierRepository.delete(id);

    return supplierDelete;
  }

  restore(id: number) {
    return this.supplierRepository.restore(id);
  }
}
