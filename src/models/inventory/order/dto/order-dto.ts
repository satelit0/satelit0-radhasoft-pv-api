import { IsDateString, IsEnum, IsInt, IsString } from 'class-validator';
import { OrderType, TypeNCF, StatusOrderDelivery, StatusOrderPay } from '../../../../helpers/enums';
export class OrderDto {
  
  @IsInt()
  id: number;

  subsidiaryId: number;
  
  userId: number;
  
  @IsInt()
  invoiceNumber: number;
  
 
  @IsInt()
  clientId: number;

  @IsEnum(OrderType)
  orderType: OrderType;

  @IsEnum(StatusOrderDelivery)
  statusDelivery: StatusOrderDelivery;

  @IsEnum(StatusOrderPay)
  statusPay: StatusOrderPay;

  ncf: string;

  @IsEnum(TypeNCF)
  typeNcf: TypeNCF;

  @IsDateString()
  deliverDate: Date;

  @IsDateString()
  updatedAt: Date;

  @IsDateString()
  createdAt: Date;
}