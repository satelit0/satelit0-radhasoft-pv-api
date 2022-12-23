import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/authentication/authentication/users/users.module';
import { UsersService } from './models/authentication/authentication/users/users.service';
import { ProductsModule } from './models/products/products.module';
import { ProductsService } from './models/products/products.service';
import { DescriptionProductModule } from './models/description-product/description-product.module';
import { SupplierModule } from './models/supplier/supplier.module';
import { ContactModule } from './models/contact/contact.module';
import { PersonModule } from './models/person/person.module';
import { CategoryProductModule } from './models/category-product/category-product.module';
import { OrderModule } from './models/order/order.module';
import { DetailsModule } from './models/details/details.module';
import { DataSource } from 'typeorm';
import { PersonService } from './models/person/person.service';
import { ProductsSuppliersModule } from './models/products-suppliers/products-suppliers.module';
import { DebtsToPayModule } from './models/accounts/debts-to-pay/debts-to-pay.module';
import { PaymentDetailsModule } from './models/accounts/payment-details/payment-details.module';
import { SubsidiaryExistenceModule } from './models/inventory/subsidiary-existence/subsidiary-existence.module';
import { SubsidiaryModule } from './models/company/subsidiary/subsidiary.module';
import { CompanyBaseModule } from './models/company/company-base/company-base.module';
import { DeviceModule } from './models/company/device/device.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { ClientModule } from './models/client/client.module';
import { AuthenticationModule } from './models/authentication/authentication/authentication.module';
  
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USERNAME: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),
        PORT: Joi.number().required(),
      })
    }),
    UsersModule, 
    ProductsModule, 
    DescriptionProductModule, 
    SupplierModule, 
    ContactModule, 
    PersonModule, 
    CategoryProductModule,
    OrderModule, 
    DetailsModule, 
    ProductsSuppliersModule, 
    DebtsToPayModule, 
    PaymentDetailsModule, 
    SubsidiaryExistenceModule, 
    SubsidiaryModule, 
    CompanyBaseModule,
    DeviceModule,
    DatabaseModule,
    ClientModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    ProductsService,
    PersonService
  ],
  exports: [
  ]
}) 
export class AppModule {
 
  constructor(private dataSource: DataSource) {
    
  }
}
