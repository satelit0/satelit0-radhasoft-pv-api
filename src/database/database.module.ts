import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from '../models/client/entities/client.entity';
import { Person } from '../models/person/entities/person.entity';
import { DebtsToPay } from 'src/models/accounts/debts-to-pay/entities/debts-to-pay.entity';
import { PaymentDetail } from 'src/models/accounts/payment-details/entities/payment-detail.entity';
import { Receivable } from 'src/models/accounts/receivable/entities/receivable.entity';
import { CategoryProduct } from 'src/models/category-product/entities/category-product.entity';
import { CompanyBase } from 'src/models/company/company-base/entities/company-base.entity';
import { Device } from 'src/models/company/device/entities/device.entity';
import { Subsidiary } from 'src/models/company/subsidiary/entities/subsidiary.entity';
import { Contact } from 'src/models/contact/entities/contact.entity';
import { DescriptionProduct } from 'src/models/description-product/entities/description-product.entity';
import { Detail } from 'src/models/details/entities/detail.entity';
import { Existence } from 'src/models/inventory/existence/entities/existence.entity';
import { Order } from 'src/models/order/entities/order.entity';
import { Product } from 'src/models/products/entities/product.entity';
import { Supplier } from 'src/models/supplier/entities/supplier.entity';
import { User } from 'src/models/authentication/users/entities/user.entity';

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
          // `${__dirname}/../models/**/*.entity.ts`,
          User, 
          Person, 
          Contact, 
          Supplier, 
          Product,
          CategoryProduct, 
          DescriptionProduct, 
          Order,
          Detail,
          DebtsToPay,
          Receivable,
          DebtsToPay,
          PaymentDetail,
          Existence,
          CompanyBase,
          Subsidiary,
          Device,
          Client,
        ], 
        synchronize: true,
        logging: ['query', 'error']
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