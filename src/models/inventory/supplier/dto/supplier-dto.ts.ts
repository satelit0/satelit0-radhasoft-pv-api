import { IsDateString, IsInt, IsOptional, IsString, Min } from "class-validator";

export class SupplierDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsInt()
  @Min(1)
  personId: number;

  @IsString()
  rnc: string;
  
  @IsString()
  nameEntity: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsDateString()
  deletedAt:Date; 
}
