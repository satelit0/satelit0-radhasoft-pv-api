import { Module } from '@nestjs/common';
import { CompanyBaseService } from './company-base.service';
import { CompanyBaseController } from './company-base.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyBase } from './entities/company-base.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([CompanyBase])],
  controllers: [CompanyBaseController],
  providers: [CompanyBaseService]
})
export class CompanyBaseModule {}
