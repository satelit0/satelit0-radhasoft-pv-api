import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, BadRequestException, NotFoundException, Put, Query, HttpException } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { FindOneParams } from 'src/helpers/utils';
import { PatchPersonDto } from './dto/patch-person.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Person } from './entities/person.entity';
import { httpErrotHandler } from '../../helpers/utils';

@Controller('persons')
@ApiTags('Persons')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @Post()
  @ApiBody({ description: 'Crea una nueva persona', type: CreatePersonDto })
  async create(@Body() createPersonDto: CreatePersonDto) {
    try {
      const { contactId, identity, } = createPersonDto;
      const identityExists = await this.personService.findOneBy({ identity });
      if (identityExists) throw new HttpException(`existe una persona con esta identidad: ${identity}`, 400);
      if (!contactId) createPersonDto.contactId = 1;
      return await this.personService.create(createPersonDto);
    } catch (error) {
      httpErrotHandler(error);
    }
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la persona a actualizar',
    type: Number
  })
  @ApiBody({
    description: 'Actualiza en persona',
    type: UpdatePersonDto
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePersonDto: UpdatePersonDto) {
    try {
      const person = await this.personService.findOne(id);
      if (!person) throw new HttpException(`Persona con id ${id} no encontrada`, 400);
      return await this.personService.update(id, updatePersonDto);
    } catch (error) {
      httpErrotHandler(error);
    }
  }

  @Get()
  async findAll() {
    try {
      let test = [new UpdatePersonDto()];
      const persons = await this.personService.findAll();
      return persons;
    } catch (error) {
      httpErrotHandler(error);
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la persona a buscar',
    type: Number
  })
  @ApiResponse({
    status: 200,
    type: Person,
    description: 'Datos de una persona recuperados exitosamente'
  })
  async findOne(@Param() { id }: FindOneParams) {
    try {
      if (id < 1) throw new BadRequestException("EL id debe ser mayor que 0").getResponse();
      const person = await this.personService.findOne(id);
      if (!person) return { error: new NotFoundException(`Persona con id ${id} no encontrada`).getResponse() };
      return person;
    } catch (error) {
      httpErrotHandler(error);
    }
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la persona a actualizar',
    type: Number
  })
  async patch(@Param() { id }: FindOneParams, @Body() patchPersonDto: PatchPersonDto) {
    // console.log("===> patch", patchPersonDto);
    try {
      if (!patchPersonDto || Object.keys(patchPersonDto).length == 0) return { error: new BadRequestException("Debe proveer los datos solicitados").getResponse() };
      const patchPersom = await this.personService.patch(id, patchPersonDto);
      return patchPersom;
    } catch (error) {
      httpErrotHandler(error);
    }

  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la persona a eliminar',
    type: Number
  })
  @ApiQuery({ name: 'soft', type: 'boolean', description: 'eliminado suave', required: false })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param() { id }: FindOneParams, @Query() soft?: boolean) {
    try {
      const person = await this.personService.findOne(id);
      if (!person) throw new HttpException(`Persona con id ${id} no encontrada`, 400);
      return await this.personService.remove(id, soft);
    } catch (error) {
      httpErrotHandler(error)
    }
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la persona a restaurar',
    type: Number
  })
  @Patch('restore/:id')
  async restore(@Param() { id }: FindOneParams) {
    try {
      const person = await this.personService.findOne(id, true);
      if (!person) throw new HttpException(`Persona con id ${id}, no existe`, 400);
      await this.personService.restore(id);
      return person;
    } catch (error) {
      httpErrotHandler(error);
    }
  }
}
