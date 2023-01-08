import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from 'src/database/database.providers';
import { ProductModule } from '../products/product.module';
import { NcfModule } from '../ncf/ncf.module';
import { Detail } from '../details/entities/detail.entity';
import { DetailsModule } from '../details/details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ConfigModule,
    ProductModule,
    NcfModule,
    DetailsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ...DatabaseProviders],
  exports: [OrderService]
})
export class OrderModule { }
