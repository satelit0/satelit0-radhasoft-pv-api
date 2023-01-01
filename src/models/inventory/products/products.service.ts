import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { DescriptionService } from '../description/description.service';
import { ExistenceService } from '../existence/existence.service';
import { Supplier } from '../supplier/entities/supplier.entity';
import { SupplierService } from '../supplier/supplier.service';
import { Existence } from '../existence/entities/existence.entity';
import { CreateExtistencePartialDto } from '../../entitys/entity';
import { IProduct } from 'src/models/interfaces/models.interface';
import { SubsidiaryService } from '../../company/subsidiary/subsidiary.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private descriptionService: DescriptionService,
    private existenceService: ExistenceService,
    private supplierService: SupplierService,
    private subsidiaryService: SubsidiaryService,

  ) { }

  async create(createProductDto: CreateProductDto) {

    const { description, existence, supplierIds, ...restDto } = createProductDto;
    const suppliers: Supplier[] = [];
    const existences: Existence[] = [];

    if (supplierIds && supplierIds.length > 0) {
      for (const supplierId of supplierIds) {
        const supplier = await this.supplierService.findOne(supplierId);
        suppliers.push(supplier);
      }
    }
    if (suppliers.length === 0) createProductDto.supplierIds = null;

    const product = this.productRepository.create({ suppliers, ...restDto });

    const newProduct = await this.productRepository.save(product);
    const { id } = newProduct;

    if (existence && existence.length > 0) {
      const subsidiarySelected = existence.map( sub => sub.subsidiaryId);
      const subsidiary = await this.subsidiaryService.getAll();
      const subsidiaryIds = subsidiary.map(sub => sub.id);

      for (const subId of subsidiaryIds) {
        let newExistence: Existence;
        if (subsidiarySelected.includes(subId)){
          const exist = existence.find(e => e.subsidiaryId === subId);
          newExistence = await this.existenceService.create({ ...exist, productId: id, });
          existences.push(newExistence);
        } else {
          const existenceVoid: CreateExtistencePartialDto = {
            qty: 0,
            subsidiaryId: subId,
            dateEntry: new Date(),
            dateExpire: new Date(),
          }
          newExistence = await this.existenceService.create({ ...existenceVoid, productId: id, });
          existences.push(newExistence);
          
        }
      }
      // for (const item of existence) {
      //   const newExistence = await this.existenceService.create({ ...item, productId: id, });
      // }

      newProduct.existences = [...existences];
    }

    if (description && newProduct) {
      const newDescription = await this.descriptionService.create({ productId: id, ...description });
      newProduct.description = newDescription;
    }

    return newProduct;
  }

  findAll() {

    const products = this.productRepository.findAndCount({
      relations: {
        category: true,
        existences: true,
        description: true,
        suppliers: true,
      },
      order: {
        id: 'ASC', name: 'ASC'
      }
    });

    return products;
  }
  
  getAll() {
    const products = this.productRepository.find({
      order: {
        id: 'ASC'
      }
    });

    return products;
  }

  findByName(name: string) {
    const product = this.productRepository.findOne({
      where: { name },
      relations: {
        category: true,
        existences: true,
        description: true,
        suppliers: true,
      },
    });
    return product;
  }

  findOneBy(params: IProduct, withDeleted: boolean = false) {
    const product = this.productRepository.findOne({
      where: { ...params },
      withDeleted,
      relations: {
        category: true,
        existences: true,
        description: true,
        suppliers: true,
      },
    });
    return product;
  }

  findOne(id: number, subsidiaryId?: number, withDeleted: boolean = false) {
    const product = this.productRepository.findOne({
      where: { id, existences: { subsidiaryId } },
      withDeleted,
      relations: {
        category: true,
        description: true,
        existences: {},
      }
    });
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    // const product = this.productRepository.create(updateProductDto);

    // const updateProduct = this.productRepository.update(id, product);

    // return updateProduct;
  }

  remove(id: number, soft: boolean = true) {

    if (soft) {
      return this.productRepository.softDelete(id);
    }

    const product = this.productRepository.create({ id });
    const removeProduct = this.productRepository.remove(product);

    return removeProduct;
  }

  restore(id: number) {
    return this.productRepository.restore(id);
  }
}
