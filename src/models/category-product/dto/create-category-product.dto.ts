import { OmitType, PickType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { CategoryProductDto } from './category-product-dto';

export class CreateCategoryProductDto extends PickType(CategoryProductDto, ['name']) {}
