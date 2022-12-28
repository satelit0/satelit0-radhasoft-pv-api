import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './models/authentication/users/users.service';
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
import { AuthService } from './models/authentication/auth/auth.service';
import { DeviceService } from './models/company/device/device.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './models/authentication/auth/auth.module';
import { UsersModule } from './models/authentication/users/users.module';
  
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

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
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
    DebtsToPayModule, 
    PaymentDetailsModule, 
    SubsidiaryExistenceModule, 
    SubsidiaryModule, 
    CompanyBaseModule,
    DeviceModule,
    DatabaseModule,
    ClientModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // UsersService,
    // ProductsService,
    // PersonService,
    // AuthService,
    // DeviceService,
    // AuthService
  ],
  exports: [
    // JwtModule
  ]
}) 
export class AppModule {
 
  constructor(private dataSource: DataSource) {
    
  }
}
