import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubsidiaryDto } from './dto/create-subsidiary.dto';
import { UpdateSubsidiaryDto } from './dto/update-subsidiary.dto';
import { Repository } from 'typeorm';
import { ISubsidiary } from 'src/models/interfaces/models.interface';
import { ProductsService } from '../../inventory/products/products.service';
import { Subsidiary } from './entities/subsidiary.entity';
import { ExistenceService } from '../../inventory/existence/existence.service';
import { ContactService } from '../../contact/contact.service';

@Injectable()
export class SubsidiaryService {

  constructor(
    @InjectRepository(Subsidiary) private subsidiaryRepository: Repository<Subsidiary>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
    private existenceService: ExistenceService,
    private contactService: ContactService,
  ) {
  }

  async create(createSubsidiaryDto: CreateSubsidiaryDto) {
    const { headquarters, contact, ...restCreateSubsidiaryDto } = createSubsidiaryDto;
    const product = await this.productsService.getAll();
    const productIds = product.map(prod => prod.id);


    if (headquarters) {
      await this.subsidiaryRepository.update({ headquarters: true }, { headquarters: false })
    }

    const contactId = (await this.contactService.create(contact)).id;
    const subsidiary = this.subsidiaryRepository.create({ contactId, ...restCreateSubsidiaryDto });
    const newSubsidiary = await this.subsidiaryRepository.save(subsidiary);
    const { id } = newSubsidiary;
    for (const productId of productIds) {
      await this.existenceService.create({
        productId,
        dateEntry: new Date(),
        dateExpire: new Date(),
        qty: 0,
        subsidiaryId: id
      });
    }
    return newSubsidiary;
  }

  findAll() {
    return this.subsidiaryRepository.find({
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

  update(id: number, updateSubsidiaryDto: UpdateSubsidiaryDto) {
    return this.subsidiaryRepository.update(id, updateSubsidiaryDto);
  }

  remove(id: number, soft: boolean = true) {
    if (soft) {
      return this.subsidiaryRepository.softDelete(id)
    };
    return this.subsidiaryRepository.delete(id);
  }
}
