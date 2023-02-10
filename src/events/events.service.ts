import { Injectable } from '@nestjs/common';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from '../models/authentication/auth/entities/auth.entity';
import { AuthService } from '../models/authentication/auth/auth.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class EventsService {
  constructor(
    private readonly authService: AuthService
  ) { }

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }


  async getUserFromSocket(socket: Socket) {
    // const cookie = socket.handshake.headers.cookie;
    // const { Authentication: authToken } = parse(cookie);
    // const user = await this.authService.getUserFromAuthenticationToken(authToken);
    // if (!user) {
    //   throw new WsException('Credenciales invalidas');
    // }
    // return user;

    return { id: 123, name: 'frank valdez'}
  }



  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
