import { IsDateString, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CategoryProductDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

}
