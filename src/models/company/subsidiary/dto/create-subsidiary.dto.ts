import { OmitType } from "@nestjs/mapped-types";
import { SubsidiaryDto } from './subsidiary-dto';
import { Subsidiary } from '../entities/subsidiary.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class CreateSubsidiaryDto extends OmitType(SubsidiaryDto, ['id', 'createdAt', 'updatedAt', 'uuid',]){

  @ApiProperty()
  contactId: number;

  @ApiProperty()
  companyBaseId: number;
  
  @ApiProperty()
  name: string;
}
