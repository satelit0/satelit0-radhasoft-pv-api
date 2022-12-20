import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';
export class SubsidiaryDto {
  
  @ApiProperty()
  @IsInt()
  id: number;
  
  @ApiProperty()
  @IsInt()
  contactId: number;

  @ApiProperty()
  @IsInt()
  companyBaseId: number;

  @ApiProperty()
  @Allow()
  uuid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt: Date;
}
