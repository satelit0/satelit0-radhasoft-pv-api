import { IsDateString, IsInt, IsString } from 'class-validator';

export class ApprovalDto {
  @IsString()
  id: string;

  @IsInt()
  userId: number;

  @IsString()
  authorizationCode: string;

  @IsString()
  reference: string;

  @IsString()
  photo: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}