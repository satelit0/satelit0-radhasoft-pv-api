import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ApprovalDto } from './apprval.dto';

export class CreateApprovalDto extends OmitType(ApprovalDto, ['id', 'createdAt', 'updatedAt']){
  
  @ApiProperty({name: 'userId', type: Number})
  userId: number;
  
  @ApiProperty({name: 'authorizationCode', type: String})
  authorizationCode: string;
  
  @ApiProperty({name: 'reference', type: String})
  reference: string;

  @ApiProperty({name: 'photo', type: String})
  @IsOptional()
  photo: string;
}
