import { Module } from '@nestjs/common';
import { ExistenceService } from './existence.service';
import { ExistenceController } from './existence.controller';

@Module({
  controllers: [ExistenceController],
  providers: [ExistenceService]
})
export class ExistenceModule {}
