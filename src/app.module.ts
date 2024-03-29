import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './models/inventory/products/product.module';
import { DescriptionModule } from './models/inventory/description/description.module';
import { SupplierModule } from './models/inventory/supplier/supplier.module';
import { ContactModule } from './models/contact/contact.module';
import { PersonModule } from './models/person/person.module';
import { OrderModule } from './models/inventory/order/order.module';
import { DebtsToPayModule } from './models/accounts/debts-to-pay/debts-to-pay.module';
import { PaymentDetailsModule } from './models/accounts/payment-details/payment-details.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { ClientModule } from './models/client/client.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './models/authentication/auth/auth.module';
import { UsersModule } from './models/authentication/users/users.module';
import { ExistenceModule } from './models/inventory/existence/existence.module';
import { CompanyBaseModule } from './models/company/company-base/company-base.module';
import { DeviceModule } from './models/company/device/device.module';
import { SubsidiaryModule } from './models/company/subsidiary/subsidiary.module';
import { CategoryModule } from './models/inventory/category/category.module';
import { DetailsModule } from './models/inventory/details/details.module';
import { NcfModule } from './models/inventory/ncf/ncf.module';
import { ApprovalsModule } from './models/administrative/approvals/approvals.module';
import { CaslModule } from './models/authentication/authorization/casl/casl.module';
import { RoleModule } from './models/authentication/authorization/role/role.module';
import { EmailSubscriptionsModule } from './models/email-subscriptions/email-subscriptions.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USERNAME: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),

        PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
        PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),

        PORT: Joi.number().required(),

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    UsersModule,
    ProductModule,
    DescriptionModule,
    SupplierModule,
    ContactModule,
    PersonModule,
    CategoryModule,
    OrderModule,
    DetailsModule,
    DebtsToPayModule,
    PaymentDetailsModule,
    ExistenceModule,
    SubsidiaryModule,
    CompanyBaseModule,
    DeviceModule,
    DatabaseModule,
    ClientModule,
    AuthModule,
    JwtModule,
    NcfModule,
    ApprovalsModule,
    CaslModule,
    RoleModule,
    EmailSubscriptionsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
  exports: [
  ]
})
export class AppModule {

  // constructor(private dataSource: DataSource) {

  // }
}
