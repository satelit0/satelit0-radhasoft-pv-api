import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { Allow, IsEmail, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { UserDto } from './user-dto';


// extends OmitType(UserDto, ['id', 'updateAdt', 'createdAt', 'lastLogin', 'roleId', 'personId', 'userName']) , PartialType(UserDto)
export class UpdateUserDto  extends PartialType(UserDto)
{

  // @Allow()
  // @IsOptional()
  // password: string;
}
