import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsDateString, IsInt, IsNotEmpty, IsString, Min, IsNumber, MaxLength, IsArray, IS_JSON, IsJSON, IsObject, IsOptional } from 'class-validator';

export class ProductDto {
  @IsInt()
  id: number;

  @IsInt()
  @IsOptional()
  categoryId?: number;

  @IsInt()
  @IsNotEmpty()
  descriptionId: number;
  
  @IsInt()
  @IsNotEmpty()
  existenceId: number;


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
  @IsString()
  @IsArray({each: true})
  @IsOptional()
  photo?: string[];
  
  @IsCurrency()
  cost: number;

  // @IsArray()
  @IsCurrency()
  price: number;

  @IsObject({ each: true })
  @IsOptional()
  discount?: {};
  
  @IsDateString()
  @IsNotEmpty()
  dateEntry: Date;

  @IsDateString()
  @IsNotEmpty()
  dateExpire: Date;

  @IsInt()
  @IsNotEmpty()
  qty: number;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;

}
