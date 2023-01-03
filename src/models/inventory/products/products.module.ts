import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DescriptionModule } from '../description/description.module';
import { ExistenceModule } from '../existence/existence.module';
import { SupplierModule } from '../supplier/supplier.module';
import { SubsidiaryModule } from '../../company/subsidiary/subsidiary.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from 'src/database/database.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
    ]),
    DescriptionModule,
    ExistenceModule,
    SupplierModule,
    SubsidiaryModule,
    ConfigModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService, 
    ...DatabaseProviders,
  ],
  exports: [ProductsService]
})
export class ProductsModule { }
