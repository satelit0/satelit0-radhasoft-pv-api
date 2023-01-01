import { OmitType } from "@nestjs/mapped-types";
import { SubsidiaryDto } from './subsidiary-dto';
import { Subsidiary } from '../entities/subsidiary.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, ValidateNested } from 'class-validator';
import { CreateContactDto } from '../../../contact/dto/create-contact.dto';
import { Type } from "class-transformer";

export class CreateSubsidiaryDto extends OmitType(SubsidiaryDto, ['id', 'createdAt', 'updatedAt', 'uuid', 'contactId']) {

  @ApiProperty({ name: 'headquarters', type: Boolean, required: false })
  headquarters: boolean;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  // @IsOptional()
  contact: CreateContactDto;

  @ApiProperty()
  companyBaseId: number;

  @ApiProperty()
  name: string;
}
