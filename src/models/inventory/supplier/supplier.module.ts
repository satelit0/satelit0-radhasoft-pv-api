import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { DatabaseProviders } from '../../../database/database.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier]),
    ConfigModule,
  ],
  controllers: [SupplierController],
  providers: [SupplierService, ...DatabaseProviders],
  exports:[
    SupplierService
  ]
})
export class SupplierModule {}
