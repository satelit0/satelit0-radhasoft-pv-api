import { IsCurrency, IsDateString, IsInt, IsNotEmpty, IsString, Min, IsNumber, MaxLength, IsArray, IS_JSON, IsJSON, IsObject } from 'class-validator';

export class ProductDto {
  @IsInt()
  id: number;

  @IsInt()
  @Min(1)
  categoryId: number;

  @IsInt()
  @Min(1)
  descriptionId: number;
  
  @IsInt()
  @Min(1)
  supplierId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  brand: string;

  @IsString()
  lote: string;

  @MaxLength(300, { each: true })
  @IsArray()
  photo: string[];

  @IsDateString()
  @IsNotEmpty()
  dateEntry: Date;

  @IsDateString()
  @IsNotEmpty()
  dateExpire: Date;

  @IsCurrency()
  cost: number;

  @IsArray()
  price: number[];

  @IsObject({ each: true })
  discount: { 
    "price_1": { "percent": number, "qtyMin": number } };

  @IsInt()
  qty: number;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsDateString()
  deletedAt: Date;
}
