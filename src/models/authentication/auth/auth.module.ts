import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Person } from '../../person/entities/person.entity';
import { PersonService } from '../../person/person.service';
import { Contact } from '../../contact/entities/contact.entity';
import { ContactService } from '../../contact/contact.service';
import { Device } from 'src/models/company/device/entities/device.entity';
import { DeviceService } from '../../company/device/device.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Person,
      Contact,
      Device
    ]),
    PassportModule,
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PersonService,
    ContactService,
    DeviceService,
    LocalStrategy,
    JwtStrategy,
    JwtService,
  ], 
  exports: []
})
export class AuthModule {

  constructor(
    // private config: ConfigService
    ) {

    // console.log('======> ok...', config.get('JWT_SECRET'));
    // console.log('======> ok...', config.get('JWT_EXPIRATION_TIME'));

  }

}
