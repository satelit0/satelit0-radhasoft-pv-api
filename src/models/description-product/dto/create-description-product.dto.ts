import { PickType, OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { Units } from 'src/helpers/enums';
import { DescriptionProductDto } from './description-product-dto';

export class CreateDescriptionProductDto extends PickType(DescriptionProductDto, [ 'description', 'display', 'height', 'width', 'unit' ]) {
  @IsOptional()
  display: string;

  @IsOptional()
  height: number;

  @IsOptional()
  width: number;

  @ValidateIf( ({height, width}) =>  height !== undefined || width !== undefined )
  // @IsOptional()
  @IsNotEmpty()
  unit: Units;

}
