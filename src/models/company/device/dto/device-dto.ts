import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class DeviceDto {

  @ApiProperty({name: 'id', description: 'identifier'})
  @IsInt()
  id: number;

  @ApiProperty({name: 'name', description: 'nombre del dispositivo'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({name: 'subsidiaryId', description: 'sucursal a la que pertenece'})
  @IsInt()
  @IsNotEmpty()
  subsidiaryId: number;

  @ApiProperty({name: 'macAddress', description: 'identificador fisico del dispositivo'})
  @IsArray()
  // @IsNotEmpty()
  macAddress: string[];

  @ApiProperty({name: 'operativeSystem', description: 'sistema operativo del dispositivo'})
  @IsString()
  operativeSystem: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedat: Date;

  @IsDateString()
  deletedAt: Date;
}
