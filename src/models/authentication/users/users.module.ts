import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../../contact/entities/contact.entity';
import { User } from './entities/user.entity';
import { PersonService } from '../../person/person.service';
import { Person } from '../../person/entities/person.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Auth } from '../auth/entities/auth.entity';
import { DeviceService } from 'src/models/company/device/device.service';
import { Device } from 'src/models/company/device/entities/device.entity';
import { Subsidiary } from 'src/models/company/subsidiary/entities/subsidiary.entity';
import { SubsidiaryService } from 'src/models/company/subsidiary/subsidiary.service';
import { ContactModule } from '../../contact/contact.module';
import { PersonModule } from '../../person/person.module';
import { SubsidiaryModule } from '../../company/subsidiary/subsidiary.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User, Contact, Person, Subsidiary, Auth, Device, ]),
    ContactModule,
    PersonModule,
    SubsidiaryModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, PersonService, SubsidiaryService, AuthService, DeviceService, JwtService, ConfigService],
  exports: [
    UsersService,
    // TypeOrmModule
  ]

})
export class UsersModule {}
