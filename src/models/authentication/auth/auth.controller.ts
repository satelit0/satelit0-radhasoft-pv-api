import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, Res, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserDto } from '../users/dto/user-dto';
import { User } from '../users/entities/user.entity';
import { httpErrotHandler } from '../../../helpers/utils';
import { IRequestWithUser } from 'src/models/interfaces/models.interface';
import { Response, Router } from 'express';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ROUTES } from '@nestjs/core/router/router-module';
import { Exclude, Expose } from 'class-transformer';
import { ExcludeNullInterceptor } from '../../../helpers/exclude-null.interceptor';

@SerializeOptions({strategy: 'exposeAll'})
@UseInterceptors(ExcludeNullInterceptor)
@Controller('authentication')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Get('token/verify')
  authenticate(@Req() request: IRequestWithUser) {
    const { user } = request;
    user.password = undefined;
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({ type: User })
  @ApiBody({ type: LogInDto })
  @HttpCode(200)
  @Post('log-in')
  async logIn(@Req() request: IRequestWithUser,) {
    try {
      const { user  } = request;

      const accessTokenCookie = await this.authenticationService.getCookieWithJwtAccessToken({userId: user.id, subsidiaryId: user.subsidiaryId});
      const refreshTokenCookie = await this.authenticationService.getCookieWithJwtRefreshToken(user.id, user.subsidiaryId);

      await this.authenticationService.setRefreshJwt({userId: user.id, refreshToken: refreshTokenCookie});

      request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

      user.password = undefined;
      // response.json(user);
      return user;
    } catch (error) {
      console.log(error);
      // httpErrotHandler(error, "credenciales incorrectas");
    }
  }

  @Get('refresh')
  async refresh(@Req() request: IRequestWithUser){
    const { user } = request;
    const accessTokenCookie = await this.authenticationService.getCookieWithJwtAccessToken({userId: user.id, subsidiaryId: user.subsidiaryId});
 
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  // @Post('log-out')
  // async logOut(@Req() request: IRequestWithUser, @Res() response: Response) {
    //   response.setHeader('Set-Cookie', this.authenticationService.getCookiesForLogOut());
    //   return response.sendStatus(200);
    // }
    
  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: IRequestWithUser) {
    const {user} = request;
    await this.authenticationService.removeRefreshToken(user.id);
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookiesForLogOut());
  }

}
