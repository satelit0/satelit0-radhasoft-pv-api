import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ContactDto } from './contact-dto';
import { Address, GeoLocation, Phone, SocialNetworks } from '../../entitys/entity';
import { IsEmail, IsOptional, ValidateIf } from 'class-validator';
import { CreateClientDto } from '../../client/dto/create-client.dto';
import { Description } from '../../inventory/description/entities/description.entity';

export class CreateContactDto extends OmitType(ContactDto, ['id','createdAt', 'updatedAt', 'deletedAt', 'contactUuid']) {

  // @ApiProperty({ name: 'id', type: Number, description: 'identificador del contacto si existe' })
  // id?: number;
  // @ApiProperty({ name: 'contactId', type: 'integer' })
  // contactId: string;
  @ApiProperty({ name: 'provinceId', type: 'integer', required: false })
  provinceId: number;

  @ApiProperty({ name: 'municipalityId', type: 'integer', required: false })
  municipalityId: number;

  @ApiProperty({ name: 'email', type: String, required: false, default: undefined })
  @ValidateIf(({ email }) => email != undefined)
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'phones', type: Phone, required: false })
  phones: Phone;

  @ApiProperty({ name: 'socialNetworks', type: SocialNetworks, required: false })
  socialNetworks: SocialNetworks;

  @ApiProperty({ name: 'geoLocation', type: GeoLocation, required: false })
  geoLocation: GeoLocation;

  @ApiProperty({ name: 'address', type: Address, required: false })
  address: Address;

}

