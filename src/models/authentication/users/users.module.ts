import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../../contact/entities/contact.entity';
import { SubsidiaryService } from '../../company/subsidiary/subsidiary.service';
import { Subsidiary } from '../../company/subsidiary/entities/subsidiary.entity';
import { User } from './entities/user.entity';
import { PersonService } from '../../person/person.service';
import { Person } from '../../person/entities/person.entity';
import { AuthService } from '../auth/auth.service';
import { Device } from '../../company/device/entities/device.entity';
import { DeviceService } from '../../company/device/device.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Auth } from '../auth/entities/auth.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User, Contact, Person, Subsidiary, Auth, Device, ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PersonService, SubsidiaryService, AuthService, DeviceService, JwtService, ConfigService],
  exports: [
    UsersService,
    // TypeOrmModule
  ]

})
export class UsersModule {}
