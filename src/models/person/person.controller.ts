import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, ParseIntPipe, BadRequestException, NotFoundException, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { IsInt, isNumber, IsNumber, Max } from 'class-validator';
import { FindOneParams } from 'src/helpers/utils';
import { PatchPersonDto } from './dto/patch-person.dto';

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
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
  async findOne(@Param() { id }: FindOneParams) {

    if (id < 1) return {
      error: new BadRequestException("EL id debe ser mayor que 0").getResponse()
    };
    
    const person = await this.personService.findOne(id);

    if (!person) return { error: new NotFoundException(`Persona con id ${id} no encontrada`).getResponse()};
    
    return person;
  }

  @Patch(':id')
  async patch(@Param() { id }: FindOneParams, @Body() patchPersonDto: PatchPersonDto) {
    // console.log("===> patch", patchPersonDto);

    if (!patchPersonDto || Object.keys(patchPersonDto).length  == 0 ) return { error: new BadRequestException("Debe proveer los datos solicitados").getResponse()};
    
    const patchPersom = await this.personService.patch(id, patchPersonDto); 
    return patchPersom;

  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePersonDto: UpdatePersonDto) {
    return await this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param() { id }: FindOneParams) {
    return await this.personService.remove(id);
  }
}
