import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {

  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>
  ) {

  }

  create(createSupplierDto: CreateSupplierDto) {

    const supplier = this.supplierRepository.create(createSupplierDto);
    const newSupplier = this.supplierRepository.save(supplier);

    return newSupplier;
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

    if (soft)  return this.supplierRepository.softDelete(id);

    const supplierDelete = this.supplierRepository.delete(id);

    return supplierDelete;
  }

  restore(id: number) {
    return this.supplierRepository.restore(id);
  }
}
