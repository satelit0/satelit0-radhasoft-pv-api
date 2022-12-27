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

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }

  async getCookieWithJwtToken(params: { userId: number, subsidiaryId: number }) {
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

  public getCookieWithJwtRefreshToken(userId: number, subsidiaryId: number) {
    const payload: ITokenPayload = { userId, subsidiaryId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`
    });
    const cookieRefreshToken = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return cookieRefreshToken;
  }

  async setCurrentRefreshToken(params: { refreshToken: string, userId: number }) {
    const { refreshToken, userId } = params;
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.usersService.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.usersService.findOne(userId);

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }



}
