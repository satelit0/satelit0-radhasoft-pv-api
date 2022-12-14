import { Allow, IsNotEmpty } from "class-validator";

export class PasswordDto {
  @Allow()
  @IsNotEmpty()
  password: string;
}
