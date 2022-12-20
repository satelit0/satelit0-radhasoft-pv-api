import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ContactDto } from './dto/contact-dto';

@Injectable()
export class ContactService {

  constructor(
    @InjectRepository(Contact) private contactRepisitory: Repository<Contact>
  ) { }

  create(createContactDto: CreateContactDto) {
    const newContact = this.contactRepisitory.save(createContactDto);
    return newContact;
  }

  findAll() {
    const contacts = this.contactRepisitory.find({
      relations: {
        companyBase: true,
        person: true,
        subsidiary: true,
      }
    });

    return contacts;
  }

  findOneByOfficeNumber(officeNumber: string): Promise<Contact> {
    const contact = <Promise<Contact>>this.contactRepisitory.query(
      `select * from contact where phones -> 'office' ?| array[$1] limit 1;` , [officeNumber]
    );
    return contact;
  }

  findOneBySocialNetworks(socialNetworks: string): Promise<Contact> {
    const contact = <Promise<Contact>>this.contactRepisitory.query(
      `select * from contact c where $1 = ANY (select (jsonb_each_text("socialNetworks")).value);`, [socialNetworks]
    );
    return contact;
  }

  findOne(id: number) {
    const contact = this.contactRepisitory.findOne({ 
      where: { id }, 
      relations:{
        companyBase: true,
        person: true,
        subsidiary: true,
      }
    });
    return contact;
  }

  update(id: number, updateContactDto: UpdateContactDto) {

    const contact = this.contactRepisitory.update(id, updateContactDto);

    return contact;
  }

  remove(id: number, soft: boolean = true) {
    if (soft) return this.contactRepisitory.softDelete(id);
    return this.contactRepisitory.delete(id);
  }
}
