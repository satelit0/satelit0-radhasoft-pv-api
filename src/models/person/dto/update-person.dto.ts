import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {

  @ApiProperty({type: 'string'})
  birthday?: Date;

  @ApiProperty({type: 'string'})
  firstName?: string;

  @ApiProperty({type: 'string'})
  lastName?: string;

  
}
