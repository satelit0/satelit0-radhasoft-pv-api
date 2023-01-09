import { string } from '@hapi/joi';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';
import { ApprovalDto } from './apprval.dto';

export class CreateApprovalDto extends OmitType(ApprovalDto, ['id', 'createdAt', 'updatedAt', 'authorizationCode']) {




  @ApiProperty({ readOnly: true })
  subsidiaryId: number;

  @ApiProperty({ readOnly: true })
  userRequestId: number;

  @ApiProperty({ readOnly: true })
  userAuthorizeId: number;

  @ApiProperty({ name: 'targetApproval', type: {} })
  @IsObject()
  targetApproval: {}

  @ApiProperty({ name: 'reference', type: String })
  reference: string;

  @ApiProperty({ name: 'photo', type: String, readOnly: true })
  @IsOptional()
  photo?: string;
}
