import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Contact } from '../contact/entities/contact.entity';
import { Person } from '../person/entities/person.entity';
import { PersonService } from '../person/person.service';
import { hash } from 'bcrypt';
import { SALROUNDS } from 'src/helpers/consts';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(
    private personService: PersonService,
    
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Contact)
    private contacRepository: Repository<Contact>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const { password, userName, email, personId } = createUserDto;

    const passwordHash = await hash(password, SALROUNDS);

    const user = this.userRepository.create({ userName, password: passwordHash, personId, roleId: 1 });
    const contac = this.contacRepository.create({ email, personId });
    const newUser = await this.userRepository.save(user);
    const newContac = await this.contacRepository.save(contac);

    return { newUser, newContac };
  }

  async findAll() {

    const users =  await this.userRepository.find({
      // loadEagerRelations: true,
      // loadRelationIds: true,
      relations: {
        person: {
          contac: true,
        }
      },
      select: ['id', 'userName', 'person', 'personId', 'updateAdt', 'createdAt', 'lastLogin', 'roleId']

    });

    return users;
  }

   findOne(id: number) {

    const user =  this.userRepository.findOne({
      loadRelationIds: true, 
      where: {id}, 
      select:['id', 'userName', 'person', 'personId', 'updateAdt', 'createdAt', 'lastLogin', 'roleId']});

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const { password } = updateUserDto;
    
    if( password) {
      const passwordHash = await hash(password, SALROUNDS);
      updateUserDto.password = passwordHash;
    }

    const user =  this.userRepository.create(updateUserDto);
    const userEdited = this.userRepository.update(id, user);
    // return userEdited;
    return user;
  }

  async remove(id: number) {

    const user =  await this.userRepository.findOneBy({id});

    if (!user) return new NotFoundException(`El usuario con id: ${id} no existe`).getResponse();

    const userRemoved = this.userRepository.remove(user);

    return userRemoved;
  }
}