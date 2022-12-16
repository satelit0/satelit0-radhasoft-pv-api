import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DebtsToPayService } from './debts-to-pay.service';
import { CreateDebtsToPayDto } from './dto/create-debts-to-pay.dto';
import { UpdateDebtsToPayDto } from './dto/update-debts-to-pay.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('debts-to-pay')
@ApiTags('Debts-To-Pay')
export class DebtsToPayController {
  constructor(private readonly debtsToPayService: DebtsToPayService) {}

  @Post()
  create(@Body() createDebtsToPayDto: CreateDebtsToPayDto) {
    return this.debtsToPayService.create(createDebtsToPayDto);
  }

  @Get()
  findAll() {
    return this.debtsToPayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtsToPayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebtsToPayDto: UpdateDebtsToPayDto) {
    return this.debtsToPayService.update(+id, updateDebtsToPayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtsToPayService.remove(+id);
  }
}
