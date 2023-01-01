import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DescriptionModule } from '../description/description.module';
import { ExistenceModule } from '../existence/existence.module';
import { SupplierModule } from '../supplier/supplier.module';
import { SubsidiaryModule } from '../../company/subsidiary/subsidiary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
    ]),
    DescriptionModule,
    ExistenceModule,
    SupplierModule,
    SubsidiaryModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService,],
  exports: [ProductsService]
})
export class ProductsModule { }
