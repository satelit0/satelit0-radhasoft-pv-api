import { Module } from '@nestjs/common';
import { EmailSubscriptionsService } from './email-subscriptions.service';
import { EmailSubscriptionsController } from './email-subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailSubscription } from './entities/email-subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailSubscription]),
],
  controllers: [EmailSubscriptionsController],
  providers: [EmailSubscriptionsService],
  exports: [
    EmailSubscriptionsService,
  ]
})
export class EmailSubscriptionsModule {}
