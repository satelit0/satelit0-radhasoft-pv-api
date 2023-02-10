import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Server, Socket } from 'socket.io';
import { Body } from '@nestjs/common';
import { Observable, from, map } from 'rxjs';

@WebSocketGateway( { cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly eventsService: EventsService) { }


  async handleConnection(soket: Socket) {
    await this.eventsService.getUserFromSocket(soket);
  }

  @SubscribeMessage('send-request-confirm-pay')
  async listenForReques(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
    const userauthor = await this.eventsService.getUserFromSocket(socket);
    this.server.emit('send-request-confirm-pay', { data, userauthor });
  }

  @SubscribeMessage('events')
  async requestAllEvents(@ConnectedSocket() socket: Socket) {
    await this.eventsService.getUserFromSocket(socket);
    // const messages = await this.eventsService;

    socket.emit('events', { test: 'envio recibido, on time' });
  }

  @SubscribeMessage('createEvent')
  create(@MessageBody() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3, 10]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('findOneEvent')
  findOne(@MessageBody() id: number) {
    return this.eventsService.findOne(id);
  }

  @SubscribeMessage('updateEvent')
  update(@MessageBody() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(updateEventDto.id, updateEventDto);
  }

  @SubscribeMessage('removeEvent')
  remove(@MessageBody() id: number) {
    return this.eventsService.remove(id);
  }
}
