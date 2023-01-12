import { Module } from '@nestjs/common';
import { ExistenceService } from './existence.service';
import { ExistenceController } from './existence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Existence } from './entities/existence.entity';
import { CaslModule } from '../../authentication/authorization/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Existence]),
    CaslModule
  ],
  controllers: [ExistenceController],
  providers: [ExistenceService],
  exports: [
    ExistenceService,
  ]
})
export class ExistenceModule {}
