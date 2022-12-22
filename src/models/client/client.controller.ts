import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientDto } from './dto/client.dto';
import { FindOneParams, httpErrotHandler } from '../../helpers/utils';

@Controller('client')
@ApiTags('Client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiResponse({
    status: 201,
    type: ClientDto, 
    description: 'Crea un nuevo cliente'
  })
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    try {
      return this.clientService.create(createClientDto);
    } catch (error) {
      httpErrotHandler(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.clientService.findAll();
    } catch (error) {
      httpErrotHandler(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.clientService.findOne(+id);
    } catch (error) {
      httpErrotHandler(error);
    }
  }

  @Patch(':id')
  update(@Param() {id}: FindOneParams, @Body() updateClientDto: UpdateClientDto) {
    try {
      return this.clientService.update(+id, updateClientDto);
    } catch (error) {
      httpErrotHandler(error);
    }
  }

  @Delete(':id')
  @ApiQuery({name: 'soft', type: Boolean, description: 'si true, eliminado suave, false definitivo, default: true'})
  remove(@Param() {id}: FindOneParams, @Query() soft: boolean = true) {
    try {
      return this.clientService.remove(id, soft);
    } catch (error) {
      httpErrotHandler(error);
    }
  }

  @ApiParam({name: 'id', type: Number, description: 'id del cliente a restaurar'})
  @ApiResponse({
    status: 204,
  })
  @HttpCode(204)
  @Patch('restore/:id')
  async restore(@Param() {id}: FindOneParams) {
    try {
      const client = await this.clientService.findOne(id);
      if (!client) throw new HttpException(`Cliente no existe`, 404);
      return await this.clientService.restore(id);
    } catch (error) {
      console.log(error);
      
      httpErrotHandler(error);
    }
  }

  
}
