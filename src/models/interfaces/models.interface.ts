import { ApiProperty } from "@nestjs/swagger";
import { ContactDto } from '../contact/dto/contact-dto';
import { Phone, SocialNetworks, GeoLocation, Address } from "../entitys/entity";

export interface IDevice extends IContextDate {
  id?: number;
  name?: string;
  subsidiaryId?: number;
  macAddress?: string;
  operativeSystem?: string;
}

export interface IPerson extends IContextDate {
  id?: number;
  identity?: string;
  contactId?: number;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
}

export interface IContact extends IContextDate {
  id?: number;
  contactId?: string; 
  // phones?: Phone;
  // socialNetworks?: SocialNetworks;
  email?: string;
  // geoLocation?: GeoLocation;
  municipalityId?: number;
  provinceId?: number;
  // address?: Address;
}

interface IContextDate {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

