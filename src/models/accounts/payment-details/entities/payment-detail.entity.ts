import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VirtualColumn } from 'typeorm';

@Entity()
export class PaymentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quotaNumber: number;

  @Column({ comment: "cuota capital", nullable: true })
  feeCapital: number;

  @Column({ comment: "monto de la cuota del capital que a sido pagada", nullable: true, default: 0 })
  capitalInstallmentPaymentAmount: number;

  @Column({ comment: "interes generado", nullable: true })
  interest: number;

  @Column({ comment: "interes por mora", nullable: true, default: 0 })
  interestArrears: number;

  @VirtualColumn({ query: (entity) => `select sum ("feeCapital") as total from "payment_detail" where "id" = ${entity}.id`,})
  amountPaid: number;

  @Column({ comment: "fecha en la que se realizo el pago", nullable: true })
  paymentDate: Date;

  @Column({ comment: "validar que el pago es realizado por completo", default: false })
  isPay: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
