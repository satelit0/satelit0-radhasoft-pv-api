import { OmitType, PickType } from '@nestjs/mapped-types';
import { UserDto } from './user-dto';
import { IsEmail } from 'class-validator';
export class CreateUserDto extends OmitType(UserDto, ['id', 'updateAdt', 'createdAt', 'lastLogin',]) {
  @IsEmail()
  email: string;
}
