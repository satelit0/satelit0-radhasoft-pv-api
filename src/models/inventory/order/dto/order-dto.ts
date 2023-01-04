import { IsDateString, IsEnum, IsInt, IsString } from 'class-validator';
import { OrderType, TypeNCF, StatusOrder } from '../../../../helpers/enums';
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

  @IsEnum(StatusOrder)
  status: StatusOrder;

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