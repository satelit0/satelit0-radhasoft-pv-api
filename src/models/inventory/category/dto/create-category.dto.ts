import { OmitType, PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CategoryDto } from './category.dto';

export class CreateCategoryDto extends PickType(CategoryDto, ['name', 'description']) {
  
  @ApiProperty({name: 'name', type: String})
  name: string;
  
  @ApiProperty({name: 'description', type: String})
  description?: string;
}
