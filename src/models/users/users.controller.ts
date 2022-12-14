import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  NotFoundException, 
  BadGatewayException, 
  BadRequestException, 
  Put, 
  Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PersonService } from '../person/person.service';
import { ContactService } from '../contact/contact.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../contact/entities/contact.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FindOneParams } from '../../helpers/utils';
import { hash } from "bcrypt";
import { SALROUNDS } from '../../helpers/consts';
import { PasswordDto } from './dto/password-dto';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly personService: PersonService,
    // private readonly contacService: ContactService,

    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    const { personId, email, userName, password } = createUserDto;

    const exitsUserName = await this.userRepository.findOne({ where: { userName } });
    if (exitsUserName) return new BadRequestException(`El nombre de usuario ${userName} ya esta registrado`).getResponse();

    const person = await this.personService.findOne(personId);
    if (!person) return new NotFoundException(`Persona con el id ${personId} no existe`).getResponse();

    const emailContac = await this.contactRepository.findOne({ where: { email } });
    if (emailContac) return new BadGatewayException(`El email: ${emailContac.email} ya esta registrado`).getResponse();

    // return createUserDto;
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParams) {

    const user = await this.usersService.findOne(id);
    if (!user) return new NotFoundException(`El usuario con id: ${id} no existe`).getResponse();

    return user;
  }

  @Patch(':id')
  path(@Param() { id }: FindOneParams, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Put(':id')
  async updatePassword(@Param() { id }: FindOneParams, @Body() passwordDto: PasswordDto) {

    const user = await this.usersService.findOne(id);
    if (!user) return new NotFoundException(`El usuario con id: ${id} no existe`).getResponse();
    
    const passwordEdited = await this.usersService.update(id, {password: passwordDto.password});
    passwordEdited.password = undefined;
    return passwordEdited;
  }

  @Delete(':id')
  async remove(@Param() { id }: FindOneParams ) {
    const userRemoved = await this.usersService.remove(id);
    return userRemoved;
  }
}
