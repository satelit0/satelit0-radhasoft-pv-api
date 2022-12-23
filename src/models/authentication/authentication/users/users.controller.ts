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
  Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PersonService } from '../../../person/person.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../../../contact/entities/contact.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FindOneParams, httpErrotHandler } from '../../../../helpers/utils';
import { PasswordDto } from './dto/password-dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user-dto';
import { HttpException } from '@nestjs/common';
import { SubsidiaryService } from '../../../company/subsidiary/subsidiary.service';


@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly personService: PersonService,
    private readonly subsidiaryService: SubsidiaryService,
    // private readonly contacService: ContactService,

    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

  ) { }

  @Post()
  @ApiBody({ description: 'crea un nuevo usuario', type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: UserDto,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const { personId, subsidiaryId, email, userName, password } = createUserDto;

      if (subsidiaryId == 0 || !subsidiaryId) {
        const { id } = await this.subsidiaryService.findOneBy({ headquarters: true });
        createUserDto.subsidiaryId = id;
      }

      const person = await this.personService.findOne(personId);
      if (!person) throw new HttpException(`Persona con el id ${personId} no existe`, 404);

      const exitsUserName = await this.userRepository.findOne({ where: { userName } });
      if (exitsUserName) throw new HttpException(`El nombre de usuario ${userName} ya esta registrado`, 400);

      const emailContac = await this.contactRepository.findOne({ where: { email } });
      if (emailContac) throw new HttpException(`El email: ${emailContac.email} ya esta registrado`, 400);

      const newUser = await this.usersService.create(createUserDto);
      return newUser;

    } catch (error) {
      // console.log('===>', error);
      httpErrotHandler(error);
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Usuarios recuperados exitosamente',
    type: User,
  })
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Id del usuario a buscar',
  })
  @ApiResponse({
    status: 200,
    description: 'consulta de usuario exitosa',
    type: User,
  })
  async findOne(@Param() { id }: FindOneParams) {

    const user = await this.usersService.findOne(id);
    if (!user) return new NotFoundException(`El usuario con id: ${id} no existe`).getResponse();

    return user;
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Id del usuario a editar',
  })
  path(@Param() { id }: FindOneParams, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('restore/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del usuario a restaurar'
  })
  async restore(@Param() { id }: FindOneParams) {
    // try {
    const user = await this.usersService.findOne(id, true);
    if (!user) return new HttpException(`El usuario con id: ${id} no existe`, 400).getResponse();

    return this.usersService.update(id, { deletedAt: null });
    // } catch (error) {
    // throw new HttpException("Se produjo un error inesperado. contacte el administrador", 500);
    // }
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del usuario a editar'
  })
  @ApiResponse({
    status: 200,
    type: UpdateUserDto
  })
  @ApiBody({ type: UpdateUserDto })
  async updatePassword(@Param() { id }: FindOneParams, @Body() passwordDto: PasswordDto) {

    const user = await this.usersService.findOne(id);
    if (!user) return new NotFoundException(`El usuario con id: ${id} no existe`).getResponse();

    const passwordEdited = await this.usersService.update(id, { password: passwordDto.password });
    passwordEdited.password = undefined;
    return passwordEdited;
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Id del usuario a eliminar',
  })

  @ApiParam({
    name: 'soft',
    required: false,
    type: Boolean,
    description: 'si true eliminado suave, false eliminado permanente',
  })
  async remove(@Param() { id }: FindOneParams, @Query() soft?: boolean) {

    if (soft) return await this.usersService.remove(id, soft)

    const userRemoved = await this.usersService.remove(id);
    return userRemoved;
  }
}
