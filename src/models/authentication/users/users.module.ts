import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Contact } from '../../contact/entities/contact.entity';
import { User } from './entities/user.entity';
import { PersonService } from '../../person/person.service';
import { Person } from '../../person/entities/person.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Auth } from '../auth/entities/auth.entity';
import { DeviceService } from 'src/models/company/device/device.service';
import { Device } from 'src/models/company/device/entities/device.entity';
import { ContactModule } from '../../contact/contact.module';
import { PersonModule } from '../../person/person.module';
import { Subsidiary } from '../../company/subsidiary/entities/subsidiary.entity';
import { SubsidiaryModule } from '../../company/subsidiary/subsidiary.module';
import { SubsidiaryService } from '../../company/subsidiary/subsidiary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../../inventory/products/product.module';
import { Product } from '../../inventory/products/entities/product.entity';
import { ProductService } from '../../inventory/products/product.service';
import { Description } from '../../inventory/description/entities/description.entity';
import { DescriptionModule } from '../../inventory/description/description.module';
import { ExistenceModule } from '../../inventory/existence/existence.module';
import { SupplierModule } from '../../inventory/supplier/supplier.module';
import { AuthModule } from '../auth/auth.module';
import { Supplier } from '../../inventory/supplier/entities/supplier.entity';
import { DeviceModule } from '../../company/device/device.module';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([
      User, 
      Auth, 
      Contact, 
      Device, 
      Person, 
      Product,
      Subsidiary, 
    ]),
    ContactModule, 
    DeviceModule,
    PersonModule,
    // ProductsModule,
    DescriptionModule,
    ExistenceModule,
    SupplierModule,
    // forwardRef(() => 
    SubsidiaryModule
    // ),
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    // PersonService, 
    // AuthService, 
    // DeviceService, 
    // ProductsService,
    // SubsidiaryService,
    ConfigService, 
    JwtService, 
  ],
  exports: [
    UsersService,
    // TypeOrmModule
  ]

})
export class UsersModule {}
