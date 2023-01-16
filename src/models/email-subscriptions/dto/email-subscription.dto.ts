import { IsEmail, IsInt, IsString } from "class-validator";

export class EmailSubscriptionDto {
 @IsInt()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}