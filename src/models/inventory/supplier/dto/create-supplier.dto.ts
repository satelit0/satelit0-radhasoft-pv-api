import { OmitType, PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { SupplierDto } from './supplier-dto.ts';

export class CreateSupplierDto extends OmitType(SupplierDto, ['id', 'createdAt', 'updatedAt', 'deletedAt']){


  @ApiProperty({name: 'personId', type: Number})
  personId: number;
  
  @ApiProperty({name: 'rnc', type: String})
  rnc: string;
  
  @ApiProperty({name: 'nameEntity', type: String})
  nameEntity: string;
 
}