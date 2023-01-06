import { IsDateString, IsEnum, IsInt, IsString } from 'class-validator';
import { SerieNcf, TypeNCF } from "src/helpers/enums";

export class NcfDto {
  @IsString()
  id: string;

  @IsInt()
  subsidiaryId: number;

  @IsEnum(SerieNcf)
  serie: SerieNcf;

  @IsEnum(TypeNCF)
  typeNcf: TypeNCF;

  @IsInt()
  sequence: number;

  @IsInt()
  currentValueSequence: number;

  @IsDateString()
  expirationDate: Date;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date; 
}