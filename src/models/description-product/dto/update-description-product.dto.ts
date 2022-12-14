import { PartialType } from '@nestjs/mapped-types';
import { CreateDescriptionProductDto } from './create-description-product.dto';

export class UpdateDescriptionProductDto extends PartialType(CreateDescriptionProductDto) {
}
