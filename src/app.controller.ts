import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './models/users/users.service';
import { PersonService } from './models/person/person.service';
import { Person } from './models/person/entities/person.entity';

@Controller()
export class AppController {
  constructor(
     private readonly appService: AppService,
     private readonly personService: PersonService
    ) {}

  // @Get()
  //   getHello(): string {
  //   // return this.appService.getHello();
  //   return  "test ok...";
  // }
}
