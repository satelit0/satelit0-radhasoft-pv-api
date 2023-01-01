import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Existence } from '../entities/existence.entity';
import { ExistenceDto } from './existence.dto';
export class CreateExistenceDto extends OmitType(ExistenceDto, ['id', 'createdAt', 'updatedAt', 'productId']){


  @ApiProperty({name: 'productId', type: Number})
  productId: number;
  
  @ApiProperty({name: 'subsidiaryId', type: Number})
  subsidiaryId: number;
  
  @ApiProperty({name: 'dateExpire', type: Date})
  dateExpire: Date;
  
  @ApiProperty({name: 'dateEntry', type: Date})
  dateEntry: Date;
  
  @ApiProperty({name: 'qty', type: Number})
  qty: number;
  
}
