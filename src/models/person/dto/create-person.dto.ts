import { All } from '@nestjs/common';
import { Type, Transform } from 'class-transformer';
import { Allow, IsDate, IsDateString, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from '../../../helpers/enums';
import { toTrim } from '../../../helpers/utils';
import { PersonDto } from './person-dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiParam, ApiProperty } from '@nestjs/swagger';


// @UsePipes(new ValidationPipe({stopAtFirstError: true, transform: true}))
export class CreatePersonDto extends OmitType(PersonDto, ['id', 'createdAt', 'updatedAt', 'deletedAt']){ 


  @ApiProperty({type: String})
  identity: string;

  @ApiProperty({type: String})
  firstName: string;

  @ApiProperty({type: String})
  lastName: string;

  @ApiProperty({type: Date, description: 'cudela o pasaporte'})
  birthday: Date;

  @ApiProperty({ name: 'contactId', type: Number, required:  false})
  @IsOptional()
  contactId: number;
}
