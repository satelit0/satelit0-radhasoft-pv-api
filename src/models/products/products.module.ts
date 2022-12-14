import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSuppliersService } from '../products-suppliers/products-suppliers.service';
import { ProductsSuppliersModule } from '../products-suppliers/products-suppliers.module';
import { ProductsSupplier } from '../products-suppliers/entities/products-supplier.entity';

@Module({ imports: [
  TypeOrmModule.forFeature([Product, ProductsSupplier]),
  ProductsSuppliersModule,
],
  controllers: [ProductsController, ],
  providers: [ProductsService, ProductsSuppliersService],
  exports: [TypeOrmModule]
})
export class ProductsModule {}
