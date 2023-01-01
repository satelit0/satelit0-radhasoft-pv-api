import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Person } from '../../person/entities/person.entity';
import { PersonService } from '../../person/person.service';
import { Contact } from '../../contact/entities/contact.entity';
import { ContactService } from '../../contact/contact.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { DeviceService } from 'src/models/company/device/device.service';
import { Device } from 'src/models/company/device/entities/device.entity';
import { SubsidiaryModule } from '../../company/subsidiary/subsidiary.module';
import { Subsidiary } from '../../company/subsidiary/entities/subsidiary.entity';
import { PersonModule } from '../../person/person.module';
import { ContactModule } from '../../contact/contact.module';
import { DeviceModule } from '../../company/device/device.module';
import { SubsidiaryService } from '../../company/subsidiary/subsidiary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Person,
      Contact,
      Device,
      Subsidiary
    ]),
    UsersModule,
    PersonModule,
    ContactModule,
    DeviceModule,
    SubsidiaryModule,

    PassportModule,
    ConfigModule,
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
    // UsersService,
    // PersonService,
    // ContactService,
    // DeviceService,
    // SubsidiaryService,
    LocalStrategy,
    JwtStrategy,
    // JwtService,
  ], 
  exports: [
    AuthService,
  ]
})
export class AuthModule {

  constructor(
    // private config: ConfigService
    ) {

    // console.log('======> ok...', config.get('JWT_SECRET'));
    // console.log('======> ok...', config.get('JWT_EXPIRATION_TIME'));

  }

}
