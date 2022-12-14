import { OmitType, PickType } from "@nestjs/mapped-types";
import { IsOptional } from "class-validator";
import { ProductDto } from './product-dto';

export class CreateProductDto extends OmitType(ProductDto, ['id', 'createdAt', 'updatedAt']){
  @IsOptional()
  deletedAt: Date;

  @IsOptional()
  supplierId: number;

}
