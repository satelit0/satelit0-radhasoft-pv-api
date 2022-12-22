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
    
    const user = this.userRepository.create({ userName, password: passwordHash, roleId: 1 });

    const contac = this.contacRepository.create({ email });
    
    const newUser = await this.userRepository.save(user);
    
    const newContac = await this.contacRepository.save(contac);
    return { newUser, newContac };
  }
 
  async findAll() {

    const users =  await this.userRepository.find({
      // loadEagerRelations: true,
      // loadRelationIds: true,
      select: 
      {
        id: true,
        userName: true,
        personId: true,
        roleId: true,
        subsidiaryId: true,
        devicesId: true,
        password: false,
        createdAt: true,
        updateAdt: true,
        deletedAt: true,
      },
      relations: {
        person: {
          contact: true,
        }
      },

    });

    return users;
  }

   findOne(id: number, withDeleted: boolean = false) {

    const user =  this.userRepository.findOne({
      loadRelationIds: true, 
      where: {id}, 
      // select:['id', 'userName', 'person', 'personId', 'updateAdt', 'createdAt', 'lastLogin', 'roleId'],
      withDeleted
    });

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

   remove(id: number, soft: boolean = true) {
    if (soft) return  this.userRepository.softDelete(id);
    return this.userRepository.delete(id);
  }
}
