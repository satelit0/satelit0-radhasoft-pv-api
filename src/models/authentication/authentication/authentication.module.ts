import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Person } from '../../person/entities/person.entity';
import { PersonService } from '../../person/person.service';
import { Contact } from '../../contact/entities/contact.entity';
import { ContactService } from '../../contact/contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, 
    Person, 
    Contact
  ])],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService, 
    UsersService, 
    PersonService, 
    ContactService
  ]
})
export class AuthenticationModule {}
