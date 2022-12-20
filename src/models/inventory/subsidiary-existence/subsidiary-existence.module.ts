import { Module } from '@nestjs/common';
import { SubsidiaryExistenceService } from './subsidiary-existence.service';
import { SubsidiaryExistenceController } from './subsidiary-existence.controller';

@Module({
  controllers: [SubsidiaryExistenceController],
  providers: [SubsidiaryExistenceService]
})
export class SubsidiaryExistenceModule {}
