import { OmitType, PickType } from '@nestjs/mapped-types';
import { UserDto } from './user-dto';
import { IsEmail, IsOptional } from 'class-validator';
import { ApiParam, ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends OmitType(UserDto, ['id', 'updateAdt', 'createdAt', 'lastLogin',]) {

  
  @ApiProperty({name: 'userName', type: 'string', required: true})
  userName: string;

  @IsEmail()
  @ApiProperty({name: 'email', type: 'string', required: true})
  email: string;
  
  @ApiProperty({name: 'password', type: 'string', required: true})
  password: string;

}
