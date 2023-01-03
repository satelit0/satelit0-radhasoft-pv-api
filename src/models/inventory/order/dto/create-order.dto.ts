import { OmitType } from "@nestjs/mapped-types";
import { OrderDto } from './order-dto';

export class CreateOrderDto extends OmitType(OrderDto, ['id', 'invoiceNumber', 'createdAt', 'updatedAt',]) {}
