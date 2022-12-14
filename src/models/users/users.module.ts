import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Contact } from '../contact/entities/contact.entity';
import { Person } from '../person/entities/person.entity';
import { PersonModule } from '../person/person.module';
import { PersonService } from '../person/person.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User, Contact, Person]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PersonService],
  exports: [TypeOrmModule]

})
export class UsersModule {}
