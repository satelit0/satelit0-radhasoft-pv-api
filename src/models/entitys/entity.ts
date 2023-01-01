import { PickType, PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString, IsOptional, ValidateIf, Min, Allow, IsInt } from 'class-validator';
import { CreateExistenceDto } from '../inventory/existence/dto/create-existence.dto';
import { CreateDescriptionDto } from '../inventory/description/dto/create-description.dto';
import { Units } from 'src/helpers/enums';

export class Phone {
  @ApiProperty({ name: 'celular', type: Array, required: true })
  @IsOptional()
  celular: string[];

  @ApiProperty({ name: 'office', type: Array })
  @IsOptional()
  office?: string[];

  @ApiProperty({ name: 'fax', type: String })
  @IsOptional()
  fax?: string;
}

export class SocialNetworks {
  @ApiProperty({ name: 'whatsapp', type: 'string' })
  @IsOptional()
  whatsapp?: string;

  @ApiProperty({ name: 'telegram', type: 'string' })
  @IsOptional()
  telegram?: string;

  @ApiProperty({ name: 'facebook', type: 'string' })
  @IsOptional()
  facebook?: string;

  @ApiProperty({ name: 'instagram', type: 'string' })
  @IsOptional()
  instagram?: string;

  @ApiProperty({ name: 'twetter', type: 'string' })
  @IsOptional()
  twetter?: string;
}

export class Address {
  @ApiProperty({ name: 'street', type: 'string' })
  @IsOptional()
  street?: string;

  @ApiProperty({ name: 'building', type: 'string' })
  @IsOptional()
  building?: string;

  @ApiProperty({ name: 'apto', type: 'string' })
  @IsOptional()
  apto?: string;

  @ApiProperty({ name: 'numberApto', type: 'string' })
  @IsOptional()
  numberApto?: string;
}

export class GeoLocation {
  @ApiProperty({ name: 'latitud', type: 'string' })
  latitud?: string;
  
  @ApiProperty({ name: 'longitud', type: 'string' })
  longitud?: string;
}

export class WorkingHours {
  @ApiProperty({ name: 'hours' })
  hours: {
    startTime: string;
    endTime: string;
  };
  @ApiProperty({
    name: 'days',
  })
  days: {
    sun: boolean;
    mon: boolean;
    tue: boolean;
    wen: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
  }
}

export class CreateExtistencePartialDto extends OmitType(CreateExistenceDto, ['productId']){
  @ApiProperty({name: 'qty', type: Number})
  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @ApiProperty({name: 'subsidiaryId', type: Number})
  @IsInt()
  @Min(1)
  subsidiaryId: number;
  
  @ApiProperty({name: 'dateExpire', type: Date})
  @IsNotEmpty()
  @IsDateString()
  dateExpire: Date;

  @ApiProperty({name: 'dateEntry', type: Date})
  @IsNotEmpty()
  @IsDateString()
  dateEntry: Date;

}

export class CreateDescriptionPartialDto extends PartialType(CreateDescriptionDto){
  // @ApiProperty({ name: 'productId', type: Number })
  // productId: number;

  @ApiProperty({ name: 'description', type: String })
  description: string;

  @ApiProperty({ name: 'display', type: String, required: false })
  @IsOptional()
  display?: string;

  @ApiProperty({ name: 'height', type: Number, required: false })
  @IsOptional()
  height?: number;

  @ApiProperty({ name: 'width', type: Number, required: false })
  @IsOptional()
  width?: number;

  @ApiProperty({ name: 'unit', type: String, required: false }) 
  @ValidateIf(({ height, width }) => height !== undefined || width !== undefined)
  @IsOptional()
  @IsNotEmpty()
  unit?: Units;
}