import { OmitType, PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsInt } from 'class-validator';
import { ProductDto } from './product-dto';

export class CreateProductDto extends OmitType(ProductDto, ['id', 'createdAt', 'updatedAt',]) {

  @ApiProperty({
    name: 'discount', type: Object, default: {
      descount_1: { percent: 0.0, qtyMin: 1 },
      descount_2: { percent: 0.0, qtyMin: 2 },
      descount_3: { percent: 0.0, qtyMin: 3 }
    }
  })
  @IsOptional()
  discount?: {};

  @ApiProperty({ name: 'price', type: Number, })
  price: number;

  @ApiProperty({ name: 'cost', type: Number, })
  cost: number;

  @ApiProperty({ name: 'photo', type: Array, })
  @IsOptional()
  photo?: string[];

  @ApiProperty({ name: 'lote', type: String, })
  @IsOptional()
  lote?: string;

  @ApiProperty({ name: 'brand', type: String, })
  brand: string;

  @ApiProperty({ name: 'name', type: String, })
  name: string;

  @ApiProperty({ name: 'existenceId', type: Number, })
  existenceId: number;

  @ApiProperty({ name: 'descriptionId', type: Number, })
  descriptionId: number;

  @ApiProperty({ name: 'categoryId', type: Number, })
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ name: 'supplierIds', type: Array, description: 'suplidores', default: [0] })
  @IsOptional()
  @IsInt({ each: true })
  supplierIds: number[];


}
