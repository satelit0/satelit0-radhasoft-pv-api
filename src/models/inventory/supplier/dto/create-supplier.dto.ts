import { OmitType, PickType } from "@nestjs/mapped-types";
import { IsOptional } from "class-validator";
import { SupplierDto } from './supplier-dto.ts';

export class CreateSupplierDto extends OmitType(SupplierDto, ['id', 'createdAt', 'updatedAt']){

  @IsOptional()
  rnc: string;
 
  @IsOptional()
  deletedAt: Date;
}