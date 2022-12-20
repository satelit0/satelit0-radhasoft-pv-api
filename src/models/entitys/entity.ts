import { ApiProperty } from '@nestjs/swagger';

export class Phone {
  @ApiProperty({name: 'celular', type: Array, required: true})
  celular: string[];
  @ApiProperty({name: 'office', type: Array})
  office?: string[];
  @ApiProperty({name: 'fax', type: String})
  fax?: string;
}

export class SocialNetworks {
  @ApiProperty({name: 'whatsapp', type: 'string'})
  whatsapp?: string;
  @ApiProperty({name: 'telegram', type: 'string'})
  telegram?: string;
  @ApiProperty({name: 'facebook', type: 'string'})
  facebook?: string;
  @ApiProperty({name: 'instagram', type: 'string'})
  instagram?: string;
  @ApiProperty({name: 'twetter', type: 'string'})
  twetter?: string;
}

export class Address {
  @ApiProperty({name: 'street', type: 'string'})
  street?: string; 
  @ApiProperty({name: 'building', type: 'string'})
  building?: string; 
  @ApiProperty({name: 'apto', type: 'string'})
  apto?: string; 
  @ApiProperty({name: 'numberApto', type: 'string'})
  numberApto?: string;
}

export class GeoLocation {
  @ApiProperty({name: 'latitud', type: 'string'})
  latitud?: string; 
  @ApiProperty({name: 'longitud', type: 'string'})
  longitud?: string; 
}