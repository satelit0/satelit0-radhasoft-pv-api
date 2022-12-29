import { IsDateString, IsInt, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class ExistenceDto {
  
  @IsInt()
  id: number;

  @IsInt()
  subsidiaryId: number;

  @IsInt()
  productId: number;

  @IsNumber()
  qty: number; 

  @IsDateString()
  dateEntry: Date;

  @IsDateString()
  dateExpire: Date;
 
  @IsBoolean()
  @IsOptional()
  isActive: boolean; 

  @IsDateString()
  @IsOptional()
  updatedAt: Date;

  @IsDateString()
  @IsOptional()
  createdAt: Date;
}
