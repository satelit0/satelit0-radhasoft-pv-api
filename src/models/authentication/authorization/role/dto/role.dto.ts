import { IsString, IsObject, Allow } from 'class-validator';

export class RoleDto {

  @IsString()
  id: string;
  
  @IsString()
  name: string;
  
  // @IsObject()
  @Allow()
  permissions: {};

}