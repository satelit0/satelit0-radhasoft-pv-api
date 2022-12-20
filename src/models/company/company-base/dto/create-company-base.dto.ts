import { OmitType } from '@nestjs/mapped-types';
import { CompanyBaaseDto } from './company-baase-dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCompanyBaseDto extends OmitType(CompanyBaaseDto, ['id', 'createdAt', 'updatedAt', 'uuid']) {
  
  @ApiProperty({name: 'contactId', type: Number})
  contactId: number;

  @ApiProperty({name: 'name', type: 'string'})
  name: string;
  
  @ApiProperty({name: 'rnc', type: 'string'})
  rnc: string;

  @ApiProperty({name: 'logo', type: 'string'})
  logo: string;


  
}
