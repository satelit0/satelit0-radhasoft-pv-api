import { OmitType } from "@nestjs/mapped-types";
import { OrderDto } from './order-dto';
import { OrderType, StatusOrderDelivery, TypeNCF } from '../../../../helpers/enums';
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { CreateDetailDto } from '../../details/dto/create-detail.dto';
import { IsArray, ValidateNested } from 'class-validator';

export class CreateOrderDto extends OmitType(OrderDto, ['id', 'invoiceNumber', 'createdAt', 'updatedAt', 'deliverDate', 'status', 'typeNcf', 'statusPay']) {

  @ApiProperty({ readOnly: true })
  userId: number;

  @ApiProperty({ readOnly: true })
  subsidiaryId: number;

  @ApiProperty({ name: 'clientId', type: Number })
  clientId: number;

  @ApiProperty({ name: 'orderType', default: OrderType.CASH })
  orderType: OrderType;

  @ApiProperty({ readOnly: true })
  ncf: string;

  // @ApiProperty({ name: 'typeNcf', })
  // typeNcf: TypeNCF;
  @ApiProperty({ name: 'items', type: [CreateDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetailDto)
  items: CreateDetailDto[];

}
