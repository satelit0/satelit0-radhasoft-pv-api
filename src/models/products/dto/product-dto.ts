import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsDateString, IsInt, IsNotEmpty, IsString, Min, IsNumber, MaxLength, IsArray, IS_JSON, IsJSON, IsObject, IsOptional } from 'class-validator';

export class ProductDto {
  @IsInt()
  id: number;

  @IsInt()
  categoryId: number;

  @IsInt()
  descriptionId: number;
  
  @IsInt()
  subsidiaryExistenceId: number;
  // supplierId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  brand: string;

  @IsString()
  lote: string;


  @MaxLength(300, { each: true })
  @IsString()
  @IsArray({each: true})
  @IsOptional()
  photo?: string[];
  
  @IsCurrency()
  cost: number;

  @IsArray()
  price: number[];

  @IsObject({ each: true })
  discount: { 
    "price_1": { "percent": number, "qtyMin": number } 
  };
  
  @IsDateString()
  @IsNotEmpty()
  dateEntry: Date;

  @IsDateString()
  @IsNotEmpty()
  dateExpire: Date;

  @IsInt()
  qty: number;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

}
