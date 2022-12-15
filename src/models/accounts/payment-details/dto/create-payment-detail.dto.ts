import { OmitType } from '@nestjs/mapped-types';
import { PaymentDetailDto } from './payment-detail-dto';
export class CreatePaymentDetailDto extends OmitType(PaymentDetailDto, ['id', 'capitalInstallmentPaymentAmount', 'createdAt', 'updatedAt']) {}
