import { Module } from '@nestjs/common';
import { NcfService } from './ncf.service';
import { NcfController } from './ncf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ncf } from './entities/ncf.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from 'src/database/database.providers';

@Module({imports: [
  TypeOrmModule.forFeature([Ncf]),
  ConfigModule,
],
  controllers: [NcfController],
  providers: [NcfService, ...DatabaseProviders],
  exports: [
    NcfService,
  ]
})
export class NcfModule {}
