import { Module } from '@nestjs/common';
import { ProductsSuppliersService } from './products-suppliers.service';
import { ProductsSuppliersController } from './products-suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsSupplier } from './entities/products-supplier.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ProductsSupplier]),],
  controllers: [ProductsSuppliersController],
  providers: [ProductsSuppliersService]
})
export class ProductsSuppliersModule {}
