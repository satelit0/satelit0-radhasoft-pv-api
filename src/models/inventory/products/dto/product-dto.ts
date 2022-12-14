import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsDateString, IsInt, IsNotEmpty, IsString, Min, IsNumber, MaxLength, IsArray, IS_JSON, IsJSON, IsObject, IsOptional, IS_BASE32, IsBoolean, IsNumberString } from 'class-validator';
import { CreateExistenceDto } from '../../existence/dto/create-existence.dto';

export class ProductDto {
  @IsInt()
  id: number;

  @IsInt()
  @IsOptional()
  categoryId?: number;

  @IsNumberString()
  @IsNotEmpty()
  code: string;
  
  @IsNotEmpty()
  @IsOptional()
  existence?: CreateExistenceDto[];


  @IsOptional()
  @IsArray()
  @IsInt({each: true})
  supplierIds?: number[]

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsOptional()
  lote?: string;

  @MaxLength(300, { each: true })
  @IsArray()
  @IsOptional()
  photo?: string[];
  
  @IsNumber()
  @Min(0.1)
  cost: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.1)
  price: number;

  @IsObject({ each: true })
  @IsOptional()
  discount?: {};
  
  @IsNumber()
  @IsOptional()
  tax?: number;
  
  @IsBoolean()
  @IsOptional()
  taxExempt?: boolean;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;

}
