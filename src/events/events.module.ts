import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';
import { AuthModule } from '../models/authentication/auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  providers: [EventsGateway, EventsService]
})
export class EventsModule {}
