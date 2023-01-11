import { Allow, IsInt, IsNumber, IsString } from 'class-validator';

export class PerformApproval {

  // @IsInt()
  // orderId: number;
 
  @IsString()
  approvalId: string;
 
  @IsNumber()
  amountApproval: number;

}