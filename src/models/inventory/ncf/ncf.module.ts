import { Module } from '@nestjs/common';
import { NcfService } from './ncf.service';
import { NcfController } from './ncf.controller';

@Module({
  controllers: [NcfController],
  providers: [NcfService]
})
export class NcfModule {}
