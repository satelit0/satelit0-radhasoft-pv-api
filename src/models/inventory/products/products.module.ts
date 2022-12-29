import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Description } from '../description/entities/description.entity';
import { DescriptionModule } from '../description/description.module';
import { ExistenceService } from '../existence/existence.service';
import { ExistenceModule } from '../existence/existence.module';
import { Existence } from '../existence/entities/existence.entity';
import { DescriptionService } from '../description/description.service';

@Module({ imports: [
  TypeOrmModule.forFeature([Product, Description, Existence]),
  DescriptionModule,
  ExistenceModule,
],
  controllers: [ProductsController],
  providers: [ProductsService, DescriptionService, ExistenceService],
  exports: [ProductsService]
})
export class ProductsModule {}
