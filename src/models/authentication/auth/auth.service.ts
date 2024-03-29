import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';
import { httpErrotHandler } from '../../../helpers/utils';
import { LogInDto } from './dto/auth.dto';
import { ITokenPayload } from 'src/models/interfaces/models.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  create(createAuthenticationDto: CreateAuthDto) {
    return 'This action adds a new authentication';
  }

  async authenticatedUser(authenticatedDto: LogInDto) {
    try {
      const { username, password } = authenticatedDto;
      const user = await this.usersService.findOneBy({ userName: username });

      await this.verifyPassword(password, user.password);

      user.password = undefined;
      return user;

    } catch (error) {
      throw new UnauthorizedException("credenciales incorrectas",);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isMachingPassword = await compare(plainTextPassword, hashedPassword);
    if (!isMachingPassword) throw new UnauthorizedException(`credenciales incorrectas`,);
  }

  findAll() {
    return `This action returns all authentication`;
  }

  async setRefreshJwt(params: { refreshToken: string, userId: number }) {
    await this.usersService.setCurrentRefreshToken({ ...params });
  }

  update(id: number, updateAuthenticationDto: UpdateAuthDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }

  getCookieWithJwtAccessToken(params: { userId: number, subsidiaryId: number }) {
    const { userId, subsidiaryId } = params;
    const payload: ITokenPayload = { userId, subsidiaryId };
    const token = this.jwtService.sign(payload,
      {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        )}`,
      }
    );
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
  }

  getCookieWithJwtRefreshToken(userId: number, subsidiaryId: number) {
    const payload: ITokenPayload = { userId, subsidiaryId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`
    });
    const cookieRefreshToken = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return cookieRefreshToken;
  }

  getUserFromAuthenticationToken(token: string) {
    const payload: ITokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
    });
    if (payload.userId) {
      return this.usersService.getUserById(payload.userId);
    }
  }

  getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }

  removeRefreshToken(userId: number) {
    return this.usersService.removeRefreshToken(userId);
  }

}
