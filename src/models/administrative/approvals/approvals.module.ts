import { Module } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';
import { ApprovalsController } from './approvals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Approval } from './entities/approval.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from '../../../database/database.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Approval]),
    ConfigModule,
  ],
  controllers: [ApprovalsController],
  providers: [ApprovalsService, ...DatabaseProviders],
  exports: [ApprovalsService]
})
export class ApprovalsModule {}
