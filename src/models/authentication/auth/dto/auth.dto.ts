import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LogInDto {
  @ApiProperty({name: 'username', type: String, required: true, description: 'nombre de usuario'})
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({name: 'password', type: String, required: true, description: 'contraseña del usuario'})
  @IsNotEmpty()
  public password: string;
}