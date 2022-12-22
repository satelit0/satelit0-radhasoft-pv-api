import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client) private repositoryClient: Repository<Client>
  ) { }

  create(createClientDto: CreateClientDto) {
    const newClient = this.repositoryClient.create(createClientDto);
    return this.repositoryClient.save(newClient);
  }

  findAll() {
    return this.repositoryClient.findAndCount({
      relations: {
        person: {
          contact: true
        },
        user: true,
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
        user: true,
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
