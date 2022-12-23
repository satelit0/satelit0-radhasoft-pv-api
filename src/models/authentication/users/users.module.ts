import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../../contact/entities/contact.entity';
import { SubsidiaryService } from '../../company/subsidiary/subsidiary.service';
import { Subsidiary } from '../../company/subsidiary/entities/subsidiary.entity';
import { User } from './entities/user.entity';
import { Authentication } from '../authentication/entities/authentication.entity';
import { PersonService } from '../../person/person.service';
import { Person } from '../../person/entities/person.entity';
import { AuthenticationService } from '../authentication/authentication.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User, Contact, Person, Subsidiary, Authentication]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PersonService, SubsidiaryService, AuthenticationService],
  exports: [TypeOrmModule]

})
export class UsersModule {}
