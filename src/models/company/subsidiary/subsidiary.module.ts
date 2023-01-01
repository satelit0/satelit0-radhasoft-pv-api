import { Module, forwardRef } from '@nestjs/common';
import { SubsidiaryService } from './subsidiary.service';
import { SubsidiaryController } from './subsidiary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subsidiary } from './entities/subsidiary.entity';
import { ProductsModule } from '../../inventory/products/products.module';
import { ExistenceModule } from '../../inventory/existence/existence.module';
import { ContactModule } from '../../contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subsidiary,
    ]),
    forwardRef(() => ProductsModule),
    ExistenceModule,
    ContactModule,
  ],
  controllers: [SubsidiaryController],
  providers: [
    SubsidiaryService,
  ],
  exports: [
    SubsidiaryService,
  ],
})
export class SubsidiaryModule { }
