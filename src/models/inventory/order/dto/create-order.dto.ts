import { OmitType } from "@nestjs/mapped-types";
import { OrderDto } from './order-dto';
import { OrderType, StatusOrder, TypeNCF } from '../../../../helpers/enums';
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto extends OmitType(OrderDto, ['id', 'invoiceNumber', 'createdAt', 'updatedAt', 'deliverDate', 'userId', 'ncf']) {

  @ApiProperty({name: 'clientId', type: Number})
  clientId: number;
  
  @ApiProperty({name: 'orderType',})
  orderType: OrderType;
  
  @ApiProperty({name: 'status',})
  status: StatusOrder;
  
  @ApiProperty({name: 'typeNcf',})
  typeNcf: TypeNCF;
  
}
