import { Module } from '@nestjs/common';
import { SubsidiaryService } from './subsidiary.service';
import { SubsidiaryController } from './subsidiary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subsidiary } from './entities/subsidiary.entity';
import { CompanyBaseService } from '../company-base/company-base.service';
import { CompanyBaseModule } from '../company-base/company-base.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Subsidiary])],
  controllers: [SubsidiaryController],
  providers: [SubsidiaryService,]
})
export class SubsidiaryModule {}
