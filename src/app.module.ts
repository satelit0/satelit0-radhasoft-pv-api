import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { UsersService } from './models/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './models/products/products.module';
import { ProductsService } from './models/products/products.service';
import { DescriptionProductModule } from './models/description-product/description-product.module';
import { SupplierModule } from './models/supplier/supplier.module';
import { ContactModule } from './models/contact/contact.module';
import { Product } from './models/products/entities/product.entity';
import { User } from './models/users/entities/user.entity';
import { PersonModule } from './models/person/person.module';
import { Person } from './models/person/entities/person.entity';
import { Contact } from './models/contact/entities/contact.entity';
import { Supplier } from './models/supplier/entities/supplier.entity';
import { DescriptionProduct } from './models/description-product/entities/description-product.entity';
import { CategoryProductModule } from './models/category-product/category-product.module';
import { CategoryProduct } from './models/category-product/entities/category-product.entity';
import { OrderModule } from './models/order/order.module';
import { DetailsModule } from './models/details/details.module';
import { Order } from './models/order/entities/order.entity';
import { Detail } from './models/details/entities/detail.entity';
import { DatabaseProviders } from './database.providers';
import { DataSource } from 'typeorm';
import { PersonService } from './models/person/person.service';
import { ProductsSuppliersModule } from './models/products-suppliers/products-suppliers.module';
import { ProductsSupplier } from './models/products-suppliers/entities/products-supplier.entity';
import { DebtsToPayModule } from './models/accounts/debts-to-pay/debts-to-pay.module';
import { DebtsToPay } from './models/accounts/debts-to-pay/entities/debts-to-pay.entity';
import { Receivable } from './models/accounts/receivable/entities/receivable.entity';
import { PaymentDetailsModule } from './models/accounts/payment-details/payment-details.module';
import { PaymentDetail } from './models/accounts/payment-details/entities/payment-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "10.0.0.221",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "pv",
      synchronize: true, 
      entities: [ 
        User, 
        Person, 
        Contact, 
        Supplier, 
        Product,
        CategoryProduct, 
        DescriptionProduct,
        Order, 
        Detail,
        ProductsSupplier,
        DebtsToPay,
        Receivable,
        DebtsToPay,
        PaymentDetail,
      ],
      // autoLoadEntities: true
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
    // DatabaseModule
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
