import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDetailDto } from './dto/create-payment-detail.dto';
import { UpdatePaymentDetailDto } from './dto/update-payment-detail.dto';
import { PaymentDetail } from './entities/payment-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentDetailsService {

  constructor(
    @InjectRepository(PaymentDetail)
    private paymentDetailRepository: Repository<PaymentDetail>
  ) {
  }

  create(createPaymentDetailDto: CreatePaymentDetailDto) {

    const paymentDetail = this.paymentDetailRepository.save(createPaymentDetailDto);

    return paymentDetail;
  }

  findAll() {

    const paymentsDetails = this.paymentDetailRepository.find({
      loadRelationIds: true,
    });

    return paymentsDetails;
  }

  findOne(id: number) {
    const paymentDetail = this.paymentDetailRepository.findOne({
      where: {id},
      loadRelationIds: true
    });
    return paymentDetail;
  }

  findOneByIdAndDate(id: number, createdAt: Date) {
    const paymentDetail = this.paymentDetailRepository.findOne({
      where: { id, createdAt},
      loadRelationIds: true,
    });
    return paymentDetail;
  }

  update(id: number, updatePaymentDetailDto: UpdatePaymentDetailDto) {

    const paymentDetail = this.paymentDetailRepository.update(id, updatePaymentDetailDto);

    return paymentDetail;
  }

  remove(id: number, soft: boolean = true) {

    if (soft) return this.paymentDetailRepository.softDelete(id);

    const paymentDetail = this.paymentDetailRepository.create({id});

    return this.paymentDetailRepository.delete(paymentDetail);
  }
}
