import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { SubsidiaryService } from './subsidiary.service';
import { CreateSubsidiaryDto } from './dto/create-subsidiary.dto';
import { UpdateSubsidiaryDto } from './dto/update-subsidiary.dto';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { FindOneParams } from '../../../helpers/utils';
import { SubsidiaryDto } from './dto/subsidiary-dto';
import { Subsidiary } from './entities/subsidiary.entity';
import { CompanyBaseService } from '../company-base/company-base.service';

@Controller('subsidiary')
@ApiTags('Subsidiary')
export class SubsidiaryController {
  constructor(
    private readonly subsidiaryService: SubsidiaryService,
    // private readonly companyService: CompanyBaseService,
    ) {}

  @Post()
  @ApiBody({type: CreateSubsidiaryDto, description: 'Crea una nueva Sucursal', required: true,})
  @ApiResponse({ status: 201, type: SubsidiaryDto, description: 'suplidor creado exitosamente' })
  @ApiResponse({ status: 400, })
  async create(@Body() createSubsidiaryDto: CreateSubsidiaryDto) {
    try {
      const { companyBaseId, name} = createSubsidiaryDto;
      const subsidiary = await this.subsidiaryService.findOneByName(name); 

      if( subsidiary ) throw new HttpException(`Nombre de sucursal ya existe`, 400);
      
      return await this.subsidiaryService.create(createSubsidiaryDto);
    } catch (error) {
      throw new HttpException( error.status == 500 ?`Se produjo un error inesperado, contacte el administrador. Error: ${error.message}`: error.message, error.status);
    }
  }

  @Get()
  @ApiOkResponse({
    type: [SubsidiaryDto],
  })
  findAll() {
    return this.subsidiaryService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id', type: Number, description: 'id de la sucursal para la busqueda'})
  @ApiOkResponse({type: SubsidiaryDto})
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found'
  })
  async findOne(@Param() {id}: FindOneParams) {
    const subsidiary = await this.subsidiaryService.findOne(id);
    if( !subsidiary ) throw new HttpException(`Sucursal no existe`, HttpStatus.NOT_FOUND);
    return subsidiary;
  }

  @Patch(':id')
  @ApiParam({name: 'id', description: 'id de la sucursal a editar', required: true})
  @ApiBody({type: UpdateSubsidiaryDto, required: true})
  @ApiOkResponse({
    type: SubsidiaryDto,
  })
  async update(@Param() {id}: FindOneParams, @Body() updateSubsidiaryDto: UpdateSubsidiaryDto) {
    return await this.subsidiaryService.update(id, updateSubsidiaryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'id de la sucursal a eliminar'
  })
  @ApiQuery({
    type: Boolean,
    required: false,
    name: 'soft',
    description: 'si true eliminado suave, false definitivo'
  })
  @ApiResponse({
    status: 204,
    description: 'Acción realizaada exitosamente'
  })
  async remove(@Param() {id}: FindOneParams, @Query('soft') soft?: boolean) {
    await this.subsidiaryService.remove(id, soft);
  }
}
