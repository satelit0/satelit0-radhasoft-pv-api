import { OmitType, PickType } from '@nestjs/mapped-types';
import { UserDto } from './user-dto';
import { IsEmail, IsOptional, Min } from 'class-validator';
import { ApiParam, ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends OmitType(UserDto, ['id', 'updateAdt', 'createdAt', 'lastLogin', 'deletedAt']) {



  @ApiProperty({ name: 'personId', type: Number, })
  @Min(1)
  personId: number;

  @ApiProperty({ name: 'devicesId', type: 'number', required: false, default: 0 })
  @IsOptional()
  @Min(1)
  devicesId: number;

  @ApiProperty({ name: 'subsidiaryId', type: 'number', default: 0 })
  @IsOptional()
  // @Min(1)
  subsidiaryId: number;

  @ApiProperty({ name: 'userName', type: 'string', required: true })
  userName: string;

  @IsEmail()
  @ApiProperty({ name: 'email', type: 'string', required: true })
  email: string;

  @ApiProperty({ name: 'password', type: 'string', required: true })
  password: string;

}
