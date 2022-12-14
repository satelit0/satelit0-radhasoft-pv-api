import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsString, Length, MaxLength, Min } from 'class-validator';
import { Units } from '../../../helpers/enums';
export class DescriptionProductDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  description: string;

  @IsString()
  @MaxLength(200)
  display: string;
  
  @Min(0)
  height: number;
  
  @Min(0)
  width: number;

  @IsEnum({
    type: 'enum',
    enum: Units,
    default: Units.in
  })
  unit: Units;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;


}
