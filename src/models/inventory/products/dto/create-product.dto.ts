import { OmitType, PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsInt, IsNotEmpty, IsArray, ValidateNested, ValidateBy } from 'class-validator';
import { ProductDto } from './product-dto';
import { CreateDescriptionDto } from '../../description/dto/create-description.dto';
import { CreateExistenceDto } from "../../existence/dto/create-existence.dto";
import { CreateExtistencePartialDto, CreateDescriptionPartialDto } from '../../../entitys/entity';
import { Type } from "class-transformer";

export class CreateProductDto extends OmitType(ProductDto, ['id', 'createdAt', 'updatedAt', 'existence']) {

  @ApiProperty({ name: 'code', type: String })
  code: string;
 
  @ApiProperty({ name: 'existence', type: Array(CreateExtistencePartialDto), })
  @IsArray()
  @ValidateNested({each: true,})
  @Type(() => CreateExtistencePartialDto)
  @IsOptional()
  existence?: CreateExtistencePartialDto[];

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

  @ApiProperty({ name: 'taxExempt', type: Boolean, }) 
  taxExempt?: boolean;

  @ApiProperty({ name: 'tax', type: Number, })
  tax?: number;

  @ApiProperty({ name: 'photo', type: Array,})
  photo?: string[];

  @ApiProperty({ name: 'lote', type: String, })
  @IsOptional()
  lote?: string;

  @ApiProperty({ name: 'brand', type: String, })
  brand: string;

  @ApiProperty({ name: 'name', type: String, })
  name: string;

  @ApiProperty({ name: 'description', type: CreateDescriptionPartialDto, required: false})
  @IsOptional()
  description?: CreateDescriptionPartialDto;
 
  @ApiProperty({ name: 'supplierIds', type: Array, description: 'suplidores', default: [0], })
  @IsOptional()
  @IsInt({ each: true })
  supplierIds?: number[];

  @ApiProperty({ name: 'categoryId', type: Number, })
  @IsOptional()
  categoryId?: number;

}
