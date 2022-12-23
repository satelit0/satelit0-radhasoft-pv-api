import { IsDateString, IsInt, IsString, Min, Allow, IsEnum, IsOptional } from 'class-validator';
import { Roles } from '../../../../helpers/enums';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {

  @ApiProperty({ name: 'id', type: Number, required: false })
  @IsInt()
  @IsOptional()
  id: number;

  @ApiProperty({ name: 'personId', type: Number, })
  @IsInt()
  personId: number;

  @ApiProperty({ name: 'roleId', type: Number, required: false })
  @IsInt()
  @IsOptional()
  roleId: number;

  @ApiProperty({ name: 'subsidiaryId', type: Number, required: false })
  @IsInt()
  @IsOptional()
  subsidiaryId: number;

  @ApiProperty({ name: 'devicesId', type: Number, required: false })
  @IsInt()
  @IsOptional()
  devicesId: number;

  @ApiProperty({ name: 'userName', type: String, })
  @IsString()
  userName: string;

  @ApiProperty({ name: 'password', type: String, })
  @IsString()
  password: string;

  @IsDateString()
  lastLogin: Date;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updateAdt: Date;

  @IsDateString()
  deletedAt: Date;
}
