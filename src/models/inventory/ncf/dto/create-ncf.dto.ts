import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SerieNcf, TypeNCF } from 'src/helpers/enums';
import { NcfDto } from './ncf-dto';
export class CreateNcfDto extends OmitType(NcfDto, ['id', 'createdAt', 'updatedAt', 'subsidiaryId']) {

  
  @ApiProperty({name: 'subsidiaryId', type: Number, required: false})
  @IsOptional()
  subsidiaryId?: number;
  
  @ApiProperty({ name: 'serie', default: SerieNcf.B })
  serie: SerieNcf;
  
  @ApiProperty({ name: 'typeNcf', default: TypeNCF.FINAL_CONSUMER})
  typeNcf: TypeNCF;
  
  @ApiProperty({ name: 'sequence', type: Number })
  sequence: number;
  
  @ApiProperty({ name: 'startSequence', type: Number })
  startSequence: number;
  
  @ApiProperty({name: 'expirationDate', type: Date})
  expirationDate: Date;

}
