import { OmitType, PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { ProductDto } from './product-dto';
import { CreateDescriptionDto } from '../../description/dto/create-description.dto';
import { CreateExistenceDto } from "../../existence/dto/create-existence.dto";
import { CreateExtistencePartialDto, CreateDescriptionPartialDto } from '../../../entitys/entity';

export class CreateProductDto extends OmitType(ProductDto, ['id', 'createdAt', 'updatedAt', 'existence']) {

  
  @ApiProperty({ name: 'existence', type: CreateExtistencePartialDto, })
  @IsNotEmpty()
  existence: CreateExtistencePartialDto;


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

  @ApiProperty({ name: 'description', type: CreateDescriptionPartialDto, required: false})
  @IsOptional()
  description?: CreateDescriptionPartialDto;

  @ApiProperty({ name: 'categoryId', type: Number, })
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ name: 'supplierIds', type: Array, description: 'suplidores', default: [0], })
  @IsOptional()
  @IsInt({ each: true })
  supplierIds?: number[];


}
