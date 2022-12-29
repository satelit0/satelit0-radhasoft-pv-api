import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { PatchPersonDto } from './dto/patch-person.dto';
import { IPerson } from '../interfaces/models.interface';
import { CreateContactDto } from '../contact/dto/create-contact.dto';
import { ContactService } from '../contact/contact.service';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private contactService: ContactService,
  ) { }

  async create(createPersonDto: CreatePersonDto) {

    const { contact, ...restCreatePersonDto } = createPersonDto;

    if (!contact) {
      createPersonDto.contact = {
        address: null,
        email: null,
        geoLocation: null,
        phones: null,
        socialNetworks: null,
        municipalityId: 0,
        provinceId: 0
      };
    }
    const contactId = (await this.contactService.create(contact)).id;

    const person = this.personRepository.create({ contactId, ...restCreatePersonDto });
    
    const newPerson = await this.personRepository.save(person);
    return newPerson;
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find({
      order: { id: 'ASC' },
      // loadRelationIds: true,
      relations: {
        contact: true,
        users: true,
      }
    });
  }

  findOne(id: number, withDeleted: boolean = false): Promise<Person> {
    return this.personRepository.findOne({
      where: { id },
      relations: {
        users: true,
        contact: true,
        // supplier: {
        //   // suppliersProducts: true,
        // },
      },
      withDeleted,
    });
  }

  findOneBy(person: IPerson, withDeleted: boolean = false): Promise<Person> {
    return this.personRepository.findOne({
      where: { ...person },
      relations: {
        users: true,
        contact: true,
        // supplier: {
        //   suppliersProducts: true,
        // },
      },
      withDeleted,
    });
  }

  async patch(id: number, patchPersonDto: PatchPersonDto) {
    const person = this.personRepository.create(patchPersonDto);
    const patchPerson = await this.personRepository.update(id, person);
    return patchPerson;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {

    const personEdit = this.personRepository.update(id, updatePersonDto);

    return personEdit;
  }

  remove(id: number, soft: boolean = false) {

    if (soft) return this.personRepository.softDelete(id);

    const person = this.personRepository.create({ id });
    const personRemoved = this.personRepository.remove(person, { data: "algo mas" });
    return personRemoved;
  }


  restore(id: number) {
    return this.personRepository.restore(id);
  }
}
