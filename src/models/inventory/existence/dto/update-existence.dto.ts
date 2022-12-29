import { PartialType } from '@nestjs/swagger';
import { CreateExistenceDto } from './create-existence.dto';

export class UpdateExistenceDto extends PartialType(CreateExistenceDto) {}
