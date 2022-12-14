import { IsInt, IsDateString, Min } from 'class-validator';
export class ProductsSuppliersDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsInt()
  @Min(1)
  productId: number;

  @IsInt()
  @Min(1)
  supplierId: number;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
