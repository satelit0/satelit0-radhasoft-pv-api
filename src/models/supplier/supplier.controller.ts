import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { FindOneParams } from '../../helpers/utils';
import { Supplier } from './entities/supplier.entity';
import { ApiTags } from '@nestjs/swagger';

const MSG = "Suplidor no existe",
      MSG_NAME_ENTITY = "Nombre de suplidor",
      MSG_RNC = "RNC de suplidor";

@Controller('supplier')
@ApiTags('Supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    const { nameEntity, rnc } = createSupplierDto;

    const nameSupplier = await this.supplierService.findOneByNameEntity(nameEntity);
    if (nameSupplier) throw new HttpException(`${MSG_NAME_ENTITY} ${nameEntity}, ya existe`, 400);

    const rncSupplier = await this.supplierService.findOneByRnc(rnc);
    if (rncSupplier) throw new HttpException(`${MSG_RNC} ${rnc}, ya existe`, 400);
    return await this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParams) {
    const supplier = await this.supplierService.findOne(id);
    if (!supplier) throw new HttpException(`${MSG}, no existe`, 404);
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  async update(@Param() { id }: FindOneParams, @Body() updateSupplierDto: UpdateSupplierDto) {

    const supplier = await this.supplierService.findOne(id);
    if (!supplier) throw new HttpException(`${MSG}`, 400);

    const { rnc, nameEntity } = updateSupplierDto;

    const existsRNC = await this.supplierService.findOneByRnc(rnc);
    if (existsRNC && id != existsRNC.id) throw new HttpException(`${MSG_RNC}: ${rnc}, ya existe`, 400);
    
    const existsName = await this.supplierService.findOneByNameEntity(nameEntity);
    if (existsName && id != existsName.id) throw new HttpException(`${MSG_NAME_ENTITY}: ${nameEntity}, ya existe`, 400);


    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  async remove(@Param() { id }: FindOneParams) {
    const supplier = await this.supplierService.findOne(id);
    if (!supplier) throw new HttpException(`${MSG}`, 400);
    return await this.supplierService.remove(id, false);
  }

  @Delete('removesoft/:id')
  async removesoft(@Param() { id }: FindOneParams) {
    const supplier = await this.supplierService.findOne(id);
    if (!supplier) throw new HttpException(`${MSG}`, 400);
    return await this.supplierService.remove(id);
  }

  @Patch('restore/:id')
  async restoreById(@Param() { id }: FindOneParams) {

    const supplier = await this.supplierService.findOne(id, true);
    if (!supplier) throw new HttpException(`${MSG}`, 400);
    
    return await this.supplierService.update(id, {deletedAt: null});
  }

}
