import { IsDateString, IsInt, IsNumber, IsString } from 'class-validator';

export class DetailDto {
  
  @IsInt()
  id: number;

  @IsInt()
  orderId: number;

  @IsInt()
  productId: number;

  @IsString()
  name: string;

  @IsNumber()
  qty: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  discount?: number;

  @IsNumber()
  price: number;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}