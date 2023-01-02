import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, IsDateString, Allow, ValidateNested } from 'class-validator';
import { ClientDto } from './client.dto';
import { CreatePersonDto } from '../../person/dto/create-person.dto';
import { CreateContactDto } from '../../contact/dto/create-contact.dto';
import { Type } from 'class-transformer';
export class CreateClientDto {
  
  // @ApiProperty({name: 'userId', type: Number,})
  // @IsOptional()
  // userId: number;
  @ApiProperty({name: 'subsidiaryId', type: Number,})
  @IsOptional()
  @IsInt()
  @Min(1)
  subsidiaryId?: number;
  
  @ApiProperty({name: 'identity', type: String,})
  // @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  identity: string;

  @ApiProperty({name: 'firstName', type: String,})
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({name: 'lastName', type: String,})
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @ApiProperty({name: 'birthday', type: Date,})
  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty({name: 'contact', type: CreateContactDto,})
  @ValidateNested({each: true})
  @Type(() => CreateContactDto)
  contact: CreateContactDto;
  
}
