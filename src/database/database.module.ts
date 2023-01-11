import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from '../models/client/entities/client.entity';
import { Person } from '../models/person/entities/person.entity';
import { DebtsToPay } from 'src/models/accounts/debts-to-pay/entities/debts-to-pay.entity';
import { PaymentDetail } from 'src/models/accounts/payment-details/entities/payment-detail.entity';
import { Receivable } from 'src/models/accounts/receivable/entities/receivable.entity';
import { Contact } from 'src/models/contact/entities/contact.entity';
import { Description } from 'src/models/inventory/description/entities/description.entity';
import { Existence } from 'src/models/inventory/existence/entities/existence.entity';
import { Order } from 'src/models/inventory/order/entities/order.entity';
import { Product } from 'src/models/inventory/products/entities/product.entity';
import { Supplier } from 'src/models/inventory/supplier/entities/supplier.entity';
import { User } from 'src/models/authentication/users/entities/user.entity';
import { CompanyBase } from 'src/models/company/company-base/entities/company-base.entity';
import { Device } from 'src/models/company/device/entities/device.entity';
import { Subsidiary } from 'src/models/company/subsidiary/entities/subsidiary.entity';
import { Category } from 'src/models/inventory/category/entities/category.entity';
import { Detail } from '../models/inventory/details/entities/detail.entity';
import { DatabaseProviders } from './database.providers';
import { DataSource } from 'typeorm';
import { Ncf } from '../models/inventory/ncf/entities/ncf.entity';
import { Approval } from '../models/administrative/approvals/entities/approval.entity';
import { Role } from '../models/authentication/authorization/role/entities/role.entity';

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
          Category,
          Description,
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
          Ncf,
          Approval,
          Role,
        ],
        synchronize: true,
        logging: ['query', 'error']
      }),

      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },

    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule { }