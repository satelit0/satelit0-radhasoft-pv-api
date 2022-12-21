import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyBase } from '../models/company/company-base/entities/company-base.entity';
import { Contact } from '../models/contact/entities/contact.entity';
import { DebtsToPay } from '../models/accounts/debts-to-pay/entities/debts-to-pay.entity';
import { PaymentDetail } from '../models/accounts/payment-details/entities/payment-detail.entity';
import { Receivable } from '../models/accounts/receivable/entities/receivable.entity';
import { CategoryProduct } from '../models/category-product/entities/category-product.entity';
import { Device } from '../models/company/device/entities/device.entity';
import { Subsidiary } from '../models/company/subsidiary/entities/subsidiary.entity';
import { DescriptionProduct } from '../models/description-product/entities/description-product.entity';
import { Detail } from '../models/details/entities/detail.entity';
import { SubsidiaryExistence } from '../models/inventory/subsidiary-existence/entities/subsidiary-existence.entity';
import { Order } from '../models/order/entities/order.entity';
import { Person } from '../models/person/entities/person.entity';
import { ProductsSupplier } from '../models/products-suppliers/entities/products-supplier.entity';
import { Product } from '../models/products/entities/product.entity';
import { Supplier } from '../models/supplier/entities/supplier.entity';
import { User } from '../models/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [
          `${__dirname}/../models/**/*.entity.ts`,
        ],
        synchronize: true,
      })
    }),
  ],
  // providers: [...DatabaseProviders],
  // exports: [...DatabaseProviders],
})
export class DatabaseModule {}
// User, 
// Person, 
// Contact, 
// Supplier, 
// Product,
// CategoryProduct, 
// DescriptionProduct, 
// Order,
// Detail,
// ProductsSupplier,
// DebtsToPay,
// Receivable,
// DebtsToPay,
// PaymentDetail,
// SubsidiaryExistence,
// CompanyBase,
// Subsidiary,
// Device,