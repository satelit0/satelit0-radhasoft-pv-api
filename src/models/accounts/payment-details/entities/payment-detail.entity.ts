import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PaymentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quotaNumber: number;

  @Column({comment: "monto adudado, actual", nullable: true})
  amount: number;

  @Column({ comment: "cuota capital", nullable: true})
  feeCapital: number;

  @Column({ comment: "interes generado", nullable: true})
  interest: number;

  @Column({ comment: "interes por mora",nullable: true})
  interestArrears: number;

  @Column({ comment: "moto pagado igual al moto total o inferior a la suma de todas las partes"})
  amountPaid: number;

  @Column({ comment: "fecha en la que se realizo el pago", nullable: true })
  paymentDate: Date;

  @Column({ comment: "validar que el pago es realizado por completo", default: false})
  isPay:boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
