import { OmitType, PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";
import { SupplierDto } from './supplier-dto.ts';
import { CreatePersonDto } from '../../../person/dto/create-person.dto';
import { Type } from "class-transformer";

export class CreateSupplierDto extends OmitType(SupplierDto, ['id', 'createdAt', 'updatedAt', 'deletedAt', 'personId']) {
  
  @ApiProperty({ name: 'rnc', type: String, description: 'registro de la institución' })
  rnc: string;
  
  @ApiProperty({ name: 'nameEntity', type: String, description: 'nombre de la institución' })
  nameEntity: string;
  
  @ApiProperty({ name: 'person', type: CreatePersonDto, description: 'detos generales del empleado de la instución vendedora' })
  @ValidateNested({ each: true })
  @Type(() => CreatePersonDto)
  person: CreatePersonDto;
}