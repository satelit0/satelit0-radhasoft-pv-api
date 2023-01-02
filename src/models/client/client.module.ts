import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { DatabaseProviders } from '../../database/database.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    ConfigModule,
],
  controllers: [ClientController],
  providers: [ClientService, ...DatabaseProviders]
})
export class ClientModule {}
