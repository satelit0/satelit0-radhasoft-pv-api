import { OmitType, PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { ProductDto } from './product-dto';

export class CreateProductDto extends OmitType(ProductDto, ['id', 'createdAt', 'updatedAt',]){


  @ApiProperty({name: 'subsidiaryExistenceId', type: Number,})
  subsidiaryExistenceId: number;

  @ApiProperty({name: 'descriptionId', type: Number,})
  descriptionId: number;

  @ApiProperty({name: 'supplierId', type: Number,})
  @IsOptional()
  supplierId: number;

  @ApiProperty({name: 'categoryId', type: Number,})
  categoryId: number;

}
