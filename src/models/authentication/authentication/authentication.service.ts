import { Injectable, HttpException } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { httpErrotHandler } from '../../../helpers/utils';

@Injectable()
export class AuthenticationService {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  async authenticatedUser(userName: string, password: string) {
    try {
      const user = await this.usersService.findOneBy({ userName });

      const isMachingPassword = await compare(password, user.password);

      if (!isMachingPassword) throw new HttpException(`credenciales incorrectas`, 400);
      user.password = undefined;
      return user;

    } catch (error) {
      httpErrotHandler(error, "credenciales incorrectas");
    }
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
