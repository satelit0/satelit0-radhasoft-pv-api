import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Device } from '../entities/device.entity';
import { DeviceDto } from './device-dto';
export class CreateDeviceDto extends OmitType(DeviceDto, ['id', 'createdAt', 'updatedat', 'deletedAt']) {

  @ApiProperty({name: 'name', description: 'nombre del dispositivo'})
  name: string;

  @ApiProperty({name: 'subsidiaryId', description: 'sucursal a la que pertenece'})
  subsidiaryId: number;

  @ApiProperty({name: 'macAddress', description: 'identificador fisico del dispositivo'})
  @IsString({each: true})
  macAddress: string[];

  @ApiProperty({name: 'operativeSystem', description: 'sistema operativo del dispositivo'})
  operativeSystem: string;

}
