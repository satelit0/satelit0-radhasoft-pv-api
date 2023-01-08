import { Module } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';
import { ApprovalsController } from './approvals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Approval } from './entities/approval.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Approval]),
  ],
  controllers: [ApprovalsController],
  providers: [ApprovalsService],
  exports: [ApprovalsService]
})
export class ApprovalsModule {}
