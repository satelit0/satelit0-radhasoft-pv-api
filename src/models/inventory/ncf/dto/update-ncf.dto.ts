import { PartialType } from '@nestjs/swagger';
import { CreateNcfDto } from './create-ncf.dto';

export class UpdateNcfDto extends PartialType(CreateNcfDto) {}
