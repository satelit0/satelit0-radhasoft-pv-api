import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Contact } from '../contact/entities/contact.entity';
import { Person } from '../person/entities/person.entity';
import { PersonModule } from '../person/person.module';
import { PersonService } from '../person/person.service';
import { SubsidiaryService } from '../company/subsidiary/subsidiary.service';
import { Subsidiary } from '../company/subsidiary/entities/subsidiary.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User, Contact, Person, Subsidiary]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PersonService, SubsidiaryService],
  exports: [TypeOrmModule]

})
export class UsersModule {}
