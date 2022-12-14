import { PartialType, PickType } from '@nestjs/mapped-types';
import { Allow, IsAlpha, IsDate, IsDateString, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreatePersonDto } from './create-person.dto';
import { Transform, Type } from 'class-transformer';
import { Roles } from '../../../helpers/enums';
import { toTrim } from '../../../helpers/utils';

export class PatchPersonDto extends PartialType(CreatePersonDto) {
}
