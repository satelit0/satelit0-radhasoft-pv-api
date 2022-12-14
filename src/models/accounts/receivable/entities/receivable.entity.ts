import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { TermType, WeekendCorrection } from '../../../../helpers/enums';

@Entity()
export class Receivable {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  clientId: number;

  @Column({ comment: "id de la orden generada al facturar a credito"})
  orderId: number;
  
  @Column({ comment: "id de los pagos realizados - historial de pagos"})
  paymentDetailsId: number;

  @Column({ 
    type: 'enum',
    enum: TermType,
    default: TermType.MONTHLY,
    comment: "intervalo de timpo: dario, semanal, mensual..."})
  termPeriod: TermType;

  @Column({comment: "catidad de tiempo basado en el intervalo marcado por: termPeriod"})
  termAmountOfTime: number;

  @Column({comment: "taza de interes"})
  termInterestRate: number;

  @Column({comment: "taza de interes por mora"})
  termLatePayment: number;

  @Column({comment: "dia del mes en que se cumplirá el pago"})
  termDayOfMonth: number;

  @Column({
    type: 'enum',
    enum: WeekendCorrection,
    default: WeekendCorrection.DURING,
    comment: "corrección de fin de semana: cobro antes, durate o depues"})
  termWeekendCorrection: WeekendCorrection;

  @Column({comment: "tiempo de gracia en dias antes de aplicar mora ", default: 0})
  termGraceTime: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


}
