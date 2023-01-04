import { Inject, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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
import { Description } from '../description/entities/description.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private descriptionService: DescriptionService,
    private existenceService: ExistenceService,
    private supplierService: SupplierService,
    private subsidiaryService: SubsidiaryService,
    @Inject('DataSource') private dataSource: DataSource,

  ) { }

  async create(createProductDto: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { description, existence, supplierIds, ...restCreateProductDto } = createProductDto;
      const { code, name } = restCreateProductDto;
      const suppliers: Supplier[] = [];
      const existences: Existence[] = [];

      const productByName = await this.productRepository.findOneBy({ name });
      if (productByName) throw new HttpException(`nombre de producto ya existe: ${name}`, 400);
      const productByCode = await this.productRepository.findOneBy({ code });
      if (productByCode) throw new HttpException(`código de producto ya existe: ${code}`, 400);

      if (supplierIds && supplierIds.length > 0) {
        for (const supplierId of supplierIds) {
          const supplier = await this.supplierService.findOne(supplierId);
          suppliers.push(supplier);
        }
      }

      if (suppliers.length === 0) createProductDto.supplierIds = null;

      const product = new Product()
      Object.assign(product, { suppliers, ...restCreateProductDto });
      const newProduct = await queryRunner.manager.save(product);
      const { id } = newProduct;

      if (existence && existence.length > 0) {
        const subsidiarySelected = existence.map(sub => sub.subsidiaryId);
        const subsidiary = await this.subsidiaryService.getAll();
        const subsidiaryIds = subsidiary.map(sub => sub.id);

        for (const subId of subsidiaryIds) {
          if (subsidiarySelected.includes(subId)) {
            const existente = new Existence();
            const exist = existence.find(e => e.subsidiaryId === subId);
            Object.assign(existente, { ...exist, productId: id });
            existences.push(existente);
          } else {
            const existenceVoid: CreateExtistencePartialDto = {
              qty: 0,
              subsidiaryId: subId,
              dateEntry: new Date(),
              dateExpire: new Date(),
            }
            const existente = new Existence();
            Object.assign(existente, { ...existenceVoid, productId: id });
            existences.push(existente);
          }
        }

        const newExistences = await queryRunner.manager.save(existences);
        newProduct.existences = [...newExistences];
      }

      if (description && newProduct) {
        const description = new Description();
        Object.assign(description, { productId: id, ...description });
        const newDescription = await queryRunner.manager.save(description);
        newProduct.description = newDescription;
      }

      await queryRunner.commitTransaction();
      return newProduct;
    } catch (error) {
      // console.log('++++++++++', error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(`${error.message}`, error.status);
    } finally {
      await queryRunner.release();
    }
  }

  findAll(subsidiaryId: number) {

    const products = this.productRepository.findAndCount({
      where: { existences: { subsidiaryId } },
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

  findByName(name: string,) {
    const product = this.productRepository.findOne({
      where: { name, },
      relations: {
        category: true,
        existences: true,
        description: true,
        suppliers: true,
      },
    });
    return product;
  }

  findOneBy(params: IProduct, subsidiaryId: number, withDeleted: boolean = false) {
    const product = this.productRepository.findOne({
      where: { ...params, existences: { subsidiaryId } },
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

  findOne(id: number, subsidiaryId: number, withDeleted: boolean = false) {
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
    if (soft)  return this.productRepository.softDelete(id);
    const removeProduct = this.productRepository.delete(id);
    return removeProduct;
  }

  //Todo: eliminar para cada sucursal mediante el la existencia del producto
  restore(id: number) {
    return this.productRepository.restore(id);
  }
}
