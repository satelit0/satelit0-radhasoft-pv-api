import { OmitType, PickType } from '@nestjs/mapped-types';
import { UserDto } from './user-dto';
import { IsEmail, IsOptional } from 'class-validator';
import { ApiParam, ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends OmitType(UserDto, ['id', 'updateAdt', 'createdAt', 'lastLogin',]) {

  @ApiProperty({name: 'devicesId', type: 'number', required: false, default: 0})
  @IsOptional()
  devicesId: number;

  @ApiProperty({name: 'subsidiaryId', type: 'number', default: 0})
  @IsOptional()
  subsidiaryId: number;

  @ApiProperty({name: 'userName', type: 'string', required: true})
  userName: string;

  @IsEmail()
  @ApiProperty({name: 'email', type: 'string', required: true})
  email: string;
  
  @ApiProperty({name: 'password', type: 'string', required: true})
  password: string;

}
