import { IsDateString, IsEnum, IsInt, IsString } from 'class-validator';
import { OrderType, TypeNCF, StatusOrder } from '../../../../helpers/enums';
export class OrderDto {
  
  @IsInt()
  id: number;
  
  @IsInt()
  invoiceNumber: number;
  
  @IsInt()
  userId: number;
 
  @IsInt()
  clientId: number;

  @IsEnum(OrderType)
  orderType: OrderType;

  @IsEnum(StatusOrder)
  status: StatusOrder;

  @IsString()
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