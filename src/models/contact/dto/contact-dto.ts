import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDateString, IsEmail, IsInt, IsObject, IsOptional } from 'class-validator';
import { Address, GeoLocation, SocialNetworks, Phone } from '../../entitys/entity';
export class ContactDto {

  @ApiProperty({name: 'id', type: 'integer'})
  @IsInt()
  id: number;

  @ApiProperty({name: 'contactId', type: 'integer'})
  contactId: string;

  @ApiProperty({name: 'phones', type: Phone})
  @IsObject()
  @IsOptional()
  phones: Phone;

  @IsObject()
  @IsOptional()
  socialNetworks: SocialNetworks;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsObject()
  @IsOptional()
  geoLocation: GeoLocation;

  @IsInt()
  @IsOptional()
  municipalityId: number;

  @IsInt()
  @IsOptional()
  provinceId: number;

  @IsObject()
  @IsOptional()
  address: Address;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsDateString()
  deletedAt: Date;

}
