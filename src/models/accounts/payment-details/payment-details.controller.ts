import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentDetailsService } from './payment-details.service';
import { CreatePaymentDetailDto } from './dto/create-payment-detail.dto';
import { UpdatePaymentDetailDto } from './dto/update-payment-detail.dto';
import { FindOneParams } from '../../../helpers/utils';
import { ApiTags } from '@nestjs/swagger';

@Controller('payment-details')
@ApiTags('Payment-Details')

export class PaymentDetailsController {
  constructor(private readonly paymentDetailsService: PaymentDetailsService) {}

  @Post()
  create(@Body() createPaymentDetailDto: CreatePaymentDetailDto) {
    return this.paymentDetailsService.create(createPaymentDetailDto);
  }

  @Get()
  findAll() {
    return this.paymentDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param() {id}: FindOneParams) {
    return this.paymentDetailsService.findOne(id);
  }

  @Patch(':id')
  update(@Param() {id}: FindOneParams, @Body() updatePaymentDetailDto: UpdatePaymentDetailDto) {
    return this.paymentDetailsService.update(id, updatePaymentDetailDto);
  }

  @Delete(':id')
  remove(@Param() {id}: FindOneParams) {
    return this.paymentDetailsService.remove(id);
  }
}
