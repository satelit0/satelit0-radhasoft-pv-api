import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './models/authentication/authentication/users/users.service';
import { PersonService } from './models/person/person.service';
import { Person } from './models/person/entities/person.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/hello')
@ApiTags('Test')  
export class AppController {
  constructor(
     private readonly appService: AppService,
     private readonly personService: PersonService
    ) {}

  @Get()
    getHello(): string[] {
    return this.appService.getHello();
  }
}
