import { OmitType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { RoleDto } from './role.dto';

export class CreateRoleDto extends OmitType(RoleDto, ['id']) {


  @ApiProperty({ name: 'name', type: String })
  name: string;

  @ApiProperty({ name: 'permissions', type: {} })
  permissions: {};


}
