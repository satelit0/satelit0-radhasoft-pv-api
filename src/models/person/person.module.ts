import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Contact } from '../contact/entities/contact.entity';
import { ContactModule } from '../contact/contact.module';
import { ContactService } from '../contact/contact.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Contact]),
    ContactModule
  ],
  controllers: [PersonController],
  providers: [PersonService, ContactService],
  exports: [PersonService]
})
export class PersonModule {}
