import { OmitType, PickType } from '@nestjs/mapped-types';
import { UserDto } from './user-dto';
import { IsEmail, IsOptional, Min, IsArray, IsNumber, IsInt } from 'class-validator';
import { ApiParam, ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends OmitType(UserDto, ['id', 'updateAdt', 'createdAt', 'lastLogin', 'deletedAt']) {



  @ApiProperty({ name: 'personId', type: Number, default: 0})
  @Min(1)
  personId: number;

  @ApiProperty({ name: 'roleId', required: false, type: Number, default: 0})
  @Min(1)
  @IsOptional()
  roleId: number;

  @ApiProperty({ name: 'deviceIds', type:Array, required: false, default: [0] })
  @IsOptional()
  @IsInt({each: true})
  deviceIds: number[];

  @ApiProperty({ name: 'subsidiaryId', type: 'number', default: 0 })
  @IsOptional()
  // @Min(1)
  subsidiaryId: number;

  @ApiProperty({ name: 'userName', type: 'string', required: true })
  userName: string;

  // @IsEmail()
  // @ApiProperty({ name: 'email', type: 'string', required: true })
  // email: string;

  @ApiProperty({ name: 'password', type: 'string', required: true })
  password: string;

}
