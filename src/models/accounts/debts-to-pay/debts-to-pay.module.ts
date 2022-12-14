import { Module } from '@nestjs/common';
import { DebtsToPayService } from './debts-to-pay.service';
import { DebtsToPayController } from './debts-to-pay.controller';

@Module({
  controllers: [DebtsToPayController],
  providers: [DebtsToPayService]
})
export class DebtsToPayModule {}
