import { Module, forwardRef } from '@nestjs/common';
import { SubsidiaryService } from './subsidiary.service';
import { SubsidiaryController } from './subsidiary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subsidiary } from './entities/subsidiary.entity';
import { ProductsModule } from '../../inventory/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subsidiary,
    ]),
    forwardRef(() => ProductsModule),
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
