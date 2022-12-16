import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, ParseIntPipe, BadRequestException, NotFoundException, ValidationPipe, UsePipes, Put, Query, HttpException } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { IsInt, isNumber, IsNumber, Max } from 'class-validator';
import { FindOneParams } from 'src/helpers/utils';
import { PatchPersonDto } from './dto/patch-person.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type } from 'os';
import { ok } from 'assert';
import { Person } from './entities/person.entity';

@Controller('persons')
@ApiTags('Persons')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @Post()
  @ApiBody({ description: 'Crea una nueva persona', type: CreatePersonDto })
  create(@Body() createPersonDto: CreatePersonDto) {
    try {
      return this.personService.create(createPersonDto);
    } catch (error) {
     throw new HttpException("Se produjo un error inesperado, contacte el administrador", 500);
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
    const person = await this.personService.findOne(id);
    if (!person) throw new HttpException(`Persona con id ${id} no encontrada`, 400);
    return await this.personService.update(id, updatePersonDto);
  }

  @Get()
  async findAll() {
    // try {
    let test = [new UpdatePersonDto()];

    const persons = await this.personService.findAll();

    return persons;
    // } catch (error) {

    // }
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
    if (id < 1) throw new BadRequestException("EL id debe ser mayor que 0").getResponse();
    const person = await this.personService.findOne(id);
    if (!person) return { error: new NotFoundException(`Persona con id ${id} no encontrada`).getResponse() };
    return person;
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

    if (!patchPersonDto || Object.keys(patchPersonDto).length == 0) return { error: new BadRequestException("Debe proveer los datos solicitados").getResponse() };

    const patchPersom = await this.personService.patch(id, patchPersonDto);
    return patchPersom;

  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la persona a eliminar',
    type: Number
  })
  @HttpCode(204)
  @ApiQuery({ name: 'soft', type: 'boolean', description: 'eliminado suave', required: false })
  async remove(@Param() { id }: FindOneParams, @Query() soft?: boolean) {
    const person = await this.personService.findOne(id);
    if (!person) throw new HttpException(`Persona con id ${id} no encontrada`, 400);
    return await this.personService.remove(id, soft);
  }


  @Patch('restore/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la persona a eliminar',
    type: Number
  })
  async restore(@Param() { id }: FindOneParams) {
    const person = await this.personService.findOne(id, true);
    if (!person) throw new HttpException(`Persona con id ${id} no encontrada`, 400);
    await this.personService.update(id, {deletedAt: null});
    return person;
  }
}
