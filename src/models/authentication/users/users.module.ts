import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Contact } from '../../contact/entities/contact.entity';
import { User } from './entities/user.entity';
import { Person } from '../../person/entities/person.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Auth } from '../auth/entities/auth.entity';
import { Device } from 'src/models/company/device/entities/device.entity';
import { ContactModule } from '../../contact/contact.module';
import { PersonModule } from '../../person/person.module';
import { Subsidiary } from '../../company/subsidiary/entities/subsidiary.entity';
import { SubsidiaryModule } from '../../company/subsidiary/subsidiary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../inventory/products/entities/product.entity';
import { DescriptionModule } from '../../inventory/description/description.module';
import { ExistenceModule } from '../../inventory/existence/existence.module';
import { SupplierModule } from '../../inventory/supplier/supplier.module';
import { DeviceModule } from '../../company/device/device.module';
import { CaslModule } from '../authorization/casl/casl.module';

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
    DescriptionModule,
    ExistenceModule,
    SupplierModule,
    SubsidiaryModule,
    CaslModule,
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
