import { Module } from '@nestjs/common';
import { ExistenceService } from './existence.service';
import { ExistenceController } from './existence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Existence } from './entities/existence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Existence])],
  controllers: [ExistenceController],
  providers: [ExistenceService],
  exports: [
    ExistenceService,
  ]
})
export class ExistenceModule {}
