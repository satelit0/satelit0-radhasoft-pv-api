import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository, DataSource } from 'typeorm';
import { Contact } from '../contact/entities/contact.entity';
import { Person } from '../person/entities/person.entity';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client) private repositoryClient: Repository<Client>,
    @Inject('DataSource') private dataSource: DataSource,
  ) { }

  async create(createClientDto: CreateClientDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { contact, subsidiaryId,...restCreatePersonDto } = createClientDto;

      const newContact = new Contact();
      Object.assign(newContact, contact);
      const contactId = (await queryRunner.manager.save(newContact)).id;

      const newPerson = new Person();
      Object.assign(newPerson, {contactId,...restCreatePersonDto});
      const personId = (await queryRunner.manager.save(newPerson)).id;

      const client = new Client();
      Object.assign(client, {personId, subsidiaryId});
      const newClient = await queryRunner.manager.save(client);

      await queryRunner.commitTransaction()
      return newClient;

    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.repositoryClient.findAndCount({
      relations: {
        person: {
          contact: true
        },
        // user: true,
      }
    });
  }

  findOne(id: number) {
    return this.repositoryClient.findOne({
      where: { id },
      relations: {
        person: {
          contact: true
        },
        // user: true,
      }
    });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    const client = this.repositoryClient.create(updateClientDto);
    return this.repositoryClient.update(id, client);
  }

  remove(id: number, soft: boolean = true) {
    if (soft) return this.repositoryClient.softDelete(id);
    return this.repositoryClient.delete(id);
  }

  restore(id: number) {
    return this.repositoryClient.restore(id);
  }
}
