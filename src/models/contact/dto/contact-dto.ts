import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDateString, IsEmail, IsInt, IsObject, IsOptional } from 'class-validator';
import { Address, GeoLocation, SocialNetworks, Phone } from '../../entitys/entity';
export class ContactDto {

  @IsInt()
  @IsOptional()
  id?: number;

  contactUuid: string;

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
