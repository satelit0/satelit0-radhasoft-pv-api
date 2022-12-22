import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ClientDto } from './client.dto';
export class CreateClientDto extends PickType(ClientDto, ['personId', 'subsidiaryId', 'userId']) {
  
  @ApiProperty({name: 'userId', type: Number,})
  @IsOptional()
  userId: number;

  @ApiProperty({name: 'subsidiaryId', type: Number,})
  subsidiaryId: number;

  @ApiProperty({name: 'personId', type: Number,})
  personId: number;
  
}
