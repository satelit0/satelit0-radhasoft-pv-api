import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @ApiProperty({name: 'headquarters', type: Boolean, required: false})
  @IsOptional()
  @IsBoolean()
  headquarters: boolean;

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
