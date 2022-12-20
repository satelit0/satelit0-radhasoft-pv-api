import { IsDateString, Allow, IsObject, IsString, IsNotEmpty, IsInt, IsIn } from 'class-validator';

export class CompanyBaaseDto {
  @IsInt()
  id: number;
  
  @IsInt()
  contactId: number;

  @Allow()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  rnc: string;

  @Allow()
  logo: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
