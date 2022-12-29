import { PickType, OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { Units } from 'src/helpers/enums';
import { DescriptionDto } from './description.dto';

export class CreateDescriptionDto extends PickType(DescriptionDto, ['description', 'display', 'height', 'width', 'unit', 'productId']) {
  

  @ApiProperty({ name: 'productId', type: Number })
  productId: number;

  @ApiProperty({ name: 'description', type: String })
  description: string;

  @ApiProperty({ name: 'display', type: String })
  @IsOptional()
  display?: string;

  @ApiProperty({ name: 'height', type: Number })
  @IsOptional()
  height?: number;

  @ApiProperty({ name: 'width', type: Number })
  @IsOptional()
  width?: number;

  @ApiProperty({ name: 'unit', type: String }) 
  @ValidateIf(({ height, width }) => height !== undefined || width !== undefined)
  @IsOptional()
  @IsNotEmpty()
  unit?: Units;

}
