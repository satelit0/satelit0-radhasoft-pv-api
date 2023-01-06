import { OmitType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { DetailDto } from "./detail-dto";

export class CreateDetailDto extends OmitType(DetailDto, ['id', 'createdAt', 'updatedAt', 'orderId', 'name', 'tax']) {

  @ApiProperty({ name: 'productId', type: Number })
  productId: number;

  // @ApiProperty({ name: 'name', type: String })
  // name: string;

  @ApiProperty({ name: 'qty', type: Number })
  qty: number;

  // @ApiProperty({ name: 'tax', type: Number })
  // tax: number;

  @ApiProperty({ name: 'discount', type: Number })
  discount?: number;

  @ApiProperty({ name: 'price', type: Number })
  price: number;
}
