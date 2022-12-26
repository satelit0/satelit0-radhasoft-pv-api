import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserDto } from '../users/dto/user-dto';
import { User } from '../users/entities/user.entity';
import { httpErrotHandler } from '../../../helpers/utils';
import { IRequestWithUser } from 'src/models/interfaces/models.interface';
import { Response } from 'express';
import { LocalAuthenticationGuard } from '../guards/local-authentication.guard';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) { }

  @Get()
  findAll() {
    return this.authenticationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authenticationService.findOne(+id);
  }

  @ApiResponse({
    type: User
  })
  @HttpCode(200)
  @Post()
  async getAuthenticatedUser(@Body() authenticatedDto: LogInDto) {
    try {
      const user = await this.authenticationService.authenticatedUser(authenticatedDto);
      return user;
    } catch (error) {
      httpErrotHandler(error, "credenciales incorrectas");
    }
  }

  @ApiResponse({ type: User })
  @ApiBody({ type: LogInDto })
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: IRequestWithUser, @Res() response: Response) {
    try {
      const { user } = request;
      const { cookie, token } = await this.authenticationService.getCookieWithJwtToken(user.id);
      response.setHeader('Set-Cookie', cookie);
      response.setHeader('x-token', token);
      // console.log('========>', cookie);
      user.password = undefined;
      response.json(user);
      return user;
    } catch (error) {
      console.log(error);
      // httpErrotHandler(error, "credenciales incorrectas");
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: IRequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthDto) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
