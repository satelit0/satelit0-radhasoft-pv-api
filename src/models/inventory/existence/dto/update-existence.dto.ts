import { PartialType } from '@nestjs/swagger';
import { CreateSubsidiaryExistenceDto } from './create-existence.dto';

export class UpdateSubsidiaryExistenceDto extends PartialType(CreateSubsidiaryExistenceDto) {}
