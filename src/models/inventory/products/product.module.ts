import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DescriptionModule } from '../description/description.module';
import { ExistenceModule } from '../existence/existence.module';
import { SupplierModule } from '../supplier/supplier.module';
import { SubsidiaryModule } from '../../company/subsidiary/subsidiary.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from 'src/database/database.providers';
import { Existence } from '../existence/entities/existence.entity';

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
    ExistenceModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService, 
    ...DatabaseProviders,
  ],
  exports: [ProductService]
})
export class ProductModule { }
