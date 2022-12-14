import { Module } from '@nestjs/common';
import { DescriptionProductService } from './description-product.service';
import { DescriptionProductController } from './description-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DescriptionProduct } from './entities/description-product.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([DescriptionProduct]), ],
  controllers: [DescriptionProductController],
  providers: [DescriptionProductService]
})
export class DescriptionProductModule {}
