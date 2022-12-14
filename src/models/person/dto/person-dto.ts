import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsISO8601, Allow, IsInt, Min, IsDateString, IsOptional } from 'class-validator';
import { Roles } from "src/helpers/enums";
import { toTrim } from "src/helpers/utils";
import { CreateContactDto } from '../../contact/dto/create-contact.dto';
import { ContactDto } from '../../contact/dto/contact-dto';

export class PersonDto {
  // @IsString({ message: "El valor para nameEntity debe ser una cadena de caracteres" })
  // @IsNotEmpty({ message: "Propiedad nameEntity no puede estar vacio" })
  // @Transform(({ value }) => toTrim(value))
  // nameEntity: string;

  @ApiProperty({ name: 'id', type: Number})
  @IsInt()
  @IsOptional()
  id?: number;

  @ApiProperty({ name: 'identity', type: String})
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @IsOptional()
  identity?: string;

  @ApiProperty({ name: 'contact', type: CreateContactDto})
  @IsOptional()
  contact?: CreateContactDto;

  @ApiProperty({ name: 'firstName', type: String})
  @IsString()
  // @IsNotEmpty()
  @Transform(({ value }) => toTrim(value))
  firstName?: string;

  @ApiProperty({ name: 'lastName', type: String})
  @IsString()
  // @IsNotEmpty()
  @Transform(({ value }) => toTrim(value))
  @IsOptional()
  lastName?: string;

  @ApiProperty({ name: 'birthday', type: Date})
  @IsISO8601()
  @IsOptional()
  birthday?: Date;

  @ApiProperty({ name: 'createdAt', type: Date})
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ name: 'updatedAt', type: Date})
  @IsDateString()
  updatedAt: Date;

  @ApiProperty({ name: 'deletedAt', type: Date})
  @IsDateString()
  deletedAt: Date;

}
