import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { DatabaseProviders } from '../../database.providers';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { PatchPersonDto } from './dto/patch-person.dto';
import { User } from '../users/entities/user.entity';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>
  ) { }

  async create(createPersonDto: CreatePersonDto) {
    // console.log("DTO", createPersonDto);
    const person = this.personRepository.create(createPersonDto);
    const newPerson = await this.personRepository.save(person);
    return newPerson;
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find({ 
      order: {id: 'ASC'}, 
      loadRelationIds: true,
      // loadEagerRelations: true,
      // transaction: true,
    });
  }

  findOne(id: number, withDeleted: boolean = false): Promise<Person> {
    return this.personRepository.findOne({ 
      where: { id },
      relations: {
        users: true,
        contact: true,
        supplier: {
          suppliersProducts: true,
        },
      },
      withDeleted, 
    });
  }

  async patch(id: number, patchPersonDto: PatchPersonDto) {
    const person = this.personRepository.create(patchPersonDto);
    const patchPerson = await this.personRepository.update( id , person );
    return patchPerson;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {

    const personEdit = this.personRepository.update(id, updatePersonDto);

    return personEdit;
  }

  remove(id: number, soft: boolean = false) {

    if (soft) return this.personRepository.softDelete(id);  

    const person = this.personRepository.create({id});
    const personRemoved = this.personRepository.remove(person, {data:"algo mas"});

    return personRemoved;
    // return 'personRemoved';
  }
}
