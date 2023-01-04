import { Module, forwardRef } from '@nestjs/common';
import { SubsidiaryService } from './subsidiary.service';
import { SubsidiaryController } from './subsidiary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subsidiary } from './entities/subsidiary.entity';
import { ProductModule } from '../../inventory/products/product.module';
import { ExistenceModule } from '../../inventory/existence/existence.module';
import { ContactModule } from '../../contact/contact.module';
import { DatabaseProviders } from '../../../database/database.providers';
import { AppModule } from '../../../app.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subsidiary,
    ]),
    forwardRef(() => ProductModule),
    ExistenceModule,
    ContactModule,
    ConfigModule,
  ],
  controllers: [SubsidiaryController],
  providers: [
    SubsidiaryService, 
    ...DatabaseProviders
  ],
  exports: [
    SubsidiaryService,
  ],
})
export class SubsidiaryModule { }
