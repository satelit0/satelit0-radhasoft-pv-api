import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import { Strategy } from "passport-local";
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
  ) {
    super(
      // { userNameField: "userName",}
      );
  }

  async validate(username: string, password: string): Promise<User> {
    return await this.authService.authenticatedUser({ username, password });
  } 
}
