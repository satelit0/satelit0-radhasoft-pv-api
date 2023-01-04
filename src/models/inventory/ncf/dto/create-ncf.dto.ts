import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { SerieNcf, TypeNCF } from 'src/helpers/enums';
import { NcfDto } from './ncf-dto';
export class CreateNcfDto extends OmitType(NcfDto, ['id', 'createdAt', 'updatedAt']){
  
  @ApiProperty({name: 'serie', })
  serie: SerieNcf;
  
  @ApiProperty({name: 'typeNcf', })
  typeNcf: TypeNCF;
  
  @ApiProperty({name: 'sequence', type: Number})
  sequence: number;

}
