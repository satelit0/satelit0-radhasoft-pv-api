import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindOneParams } from '../../../helpers/utils';
import { networkInterfaces, type } from 'os';

@Controller('device')
@ApiTags('Device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

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

  @Get('mac/:mac')
  async findOneByMacAddress(@Param('mac') macAddress: string) {
    try {
      const device = await this.deviceService.findOneByMacAddress(macAddress );
      if (!device) throw new HttpException(`dispositivo no existe`, HttpStatus.NOT_FOUND);
      return device;
    } catch (error) {
      throw new HttpException(error.status == 500 ? `Se produjo un error inesperado, contacte el administrador. Error: ${error.message}` : error.message, error.status);
    }
  }

  @Patch(':id')
  update(@Param() { id }: FindOneParams, @Body() updateDeviceDto: UpdateDeviceDto) {
    try {
      return this.deviceService.update(id, updateDeviceDto);
    } catch (error) {

    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
