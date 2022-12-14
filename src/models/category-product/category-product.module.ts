import { Module } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CategoryProductController } from './category-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProduct } from './entities/category-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryProduct])
  ],
  controllers: [CategoryProductController],
  providers: [CategoryProductService],
  exports: [TypeOrmModule]
})
export class CategoryProductModule {}
