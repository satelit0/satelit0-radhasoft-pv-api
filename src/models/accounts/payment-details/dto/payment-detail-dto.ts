import { IsBoolean, IsDateString, IsIn, IsInt } from "class-validator";

export class PaymentDetailDto {

  @IsInt()
  id: number;

  @IsInt()
  quotaNumber: number;

  @IsInt()
  feeCapital: number;

  @IsInt()
  capitalInstallmentPaymentAmount: number;

  @IsInt()
  interest: number;

  @IsInt()
  interestArrears: number;

  @IsInt()
  amountPaid: number;

  @IsBoolean()
  isPay: boolean;
  
  @IsDateString()
  paymentDate: Date;
  @IsDateString()
  private readonly deletedAt: Date;
  @IsDateString()
  createdAt: Date;
  @IsDateString()
  updatedAt: Date;

}
