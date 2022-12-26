import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from '../../../helpers/utils';
import { networkInterfaces, type } from 'os';
import { DeviceDto } from './dto/device-dto';

@Controller('device')
@ApiTags('Device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @ApiBody({ type: CreateDeviceDto })
  @ApiResponse({
    type: DeviceDto,
    status: 201
  })
  @ApiResponse({
    status: 404,
    description: 'Dispositivo no existe'
  })
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    try {
      return this.deviceService.create(createDeviceDto);
    } catch (error) {
      throw new HttpException(error.status == 500 ? `Se produjo un error inesperado, contacte el administrador. Error: ${error.message}` : error.message, error.status);
    }
  }

  @Get()
  findAll() {
    return this.deviceService.findAll();
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async findOneById(@Param() { id }: FindOneParams) {
    try {
      const device = await this.deviceService.findOne({ id });
      if (!device) throw new HttpException(`dispositivo no existe`, HttpStatus.NOT_FOUND);
      return device;
    } catch (error) {
      throw new HttpException(error.status == 500 ? `Se produjo un error inesperado, contacte el administrador. Error: ${error.message}` : error.message, error.status);
    }
  }

  @ApiParam({ name: 'mac', type: String })
  @Get('mac/:mac')
  async findOneByMacAddress(@Param('mac') macAddress: string) {
    try {
      const device = await this.deviceService.findOneByMacAddress(macAddress);
      if (!device) throw new HttpException(`dispositivo no existe`, HttpStatus.NOT_FOUND);
      return device;
    } catch (error) {
      throw new HttpException(error.status == 500 ? `Se produjo un error inesperado, contacte el administrador. Error: ${error.message}` : error.message, error.status);
    }
  }

  @Patch(':id')
  async update(@Param() { id }: FindOneParams, @Body() updateDeviceDto: UpdateDeviceDto) {
    try {
      const device = await this.deviceService.findOne({ id });
      if (!device) throw new HttpException(`dispositivo no existe`, HttpStatus.NOT_FOUND);
      return this.deviceService.update(id, updateDeviceDto);
    } catch (error) {

    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'soft', type: Boolean })
  @Delete(':id')
  async remove(@Param() { id }: FindOneParams, @Query('soft') soft?: boolean) {
    const device = await this.deviceService.findOne({ id });
    if (!device) throw new HttpException(`dispositivo no existe`, HttpStatus.NOT_FOUND);
    return await this.deviceService.remove(id, soft);
  }
}
