import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { UserDto } from './user-dto';


// extends OmitType(UserDto, ['id', 'updateAdt', 'createdAt', 'lastLogin', 'roleId', 'personId', 'userName']) , PartialType(UserDto)
export class UpdateUserDto  extends PartialType(UserDto)
{
  @ApiProperty({name: 'password', type: 'string'})
  password?: string;

  @ApiProperty({name: 'userName', type: 'string'})
  userName?: string;

  @ApiProperty({name: 'roleId', type: 'number'})
  roleId?: number;

  @ApiProperty({name: 'personId', type: 'number'})
  personId?: number;

  // @ApiProperty({name: 'id', type: 'number'})
  // id?: number;
  
}
