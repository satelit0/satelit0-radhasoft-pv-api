import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class SupplierDto {
  @IsInt()
  id: number;

  @IsInt()
  @IsNotEmpty()
  personId: number;

  @IsString()
  @IsNotEmpty()
  rnc: string;
  
  @IsString()
  @IsNotEmpty()
  nameEntity: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsDateString()
  deletedAt:Date; 
}
