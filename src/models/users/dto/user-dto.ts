import { IsDateString, IsInt, IsString, Min, Allow, IsEnum } from 'class-validator';
import { Roles } from '../../../helpers/enums';
export class UserDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsInt()
  @Min(1)
  personId: number;
  
  @Min(1)
  @IsInt()
  roleId:number;

  @IsString()
  userName: string;

  @Allow()
  password: string;

  // @IsEnum(Roles)
  // role: Roles;

  @IsDateString()
  lastLogin: Date;
  
  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updateAdt: Date;
}
