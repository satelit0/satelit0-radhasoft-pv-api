import { IsDateString, IsEnum, IsInt } from "class-validator";
import { SerieNcf, TypeNCF } from "src/helpers/enums";

export class NcfDto {
  @IsInt()
  id: number;

  @IsEnum(SerieNcf)
  serie: SerieNcf;

  @IsEnum(TypeNCF)
  typeNcf: TypeNCF;

  @IsInt()
  sequence: number

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date; 
}