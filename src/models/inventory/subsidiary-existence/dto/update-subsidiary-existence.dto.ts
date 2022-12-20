import { PartialType } from '@nestjs/swagger';
import { CreateSubsidiaryExistenceDto } from './create-subsidiary-existence.dto';

export class UpdateSubsidiaryExistenceDto extends PartialType(CreateSubsidiaryExistenceDto) {}
