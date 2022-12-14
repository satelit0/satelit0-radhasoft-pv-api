import {
  Entity,
  PrimaryGeneratedColumn,
  Column, OneToOne, CreateDateColumn,
  UpdateDateColumn, Generated,
  DeleteDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { TypeNCF, OrderType, StatusOrderDelivery, StatusOrderPay, PaymentMethod } from '../../../../helpers/enums';
import { Detail } from "../../details/entities/detail.entity";
import { Ncf } from '../../ncf/entities/ncf.entity';
import { User } from '../../../authentication/users/entities/user.entity';
import { Client } from '../../../client/entities/client.entity';
import { Subsidiary } from '../../../company/subsidiary/entities/subsidiary.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'sucursal' })
  subsidiaryId: number;

  @Column({ comment: "numero auto generado para el numero de factura" })
  @Generated('increment')
  invoiceNumber: number;

  @Column()
  userId: number;

  @Column()
  clientId: number;

  @Column({ nullable: true })
  ncf: string; 
  
  @Column({ type: 'enum', enum: OrderType, default: OrderType.CASH })
  orderType: OrderType;

  @Column({ type: 'enum', enum: StatusOrderDelivery, default: StatusOrderDelivery.STATUS_PENDING, nullable: true })
  statusDelivery: StatusOrderDelivery;

  @Column({ type: 'enum', enum: StatusOrderPay, default: StatusOrderPay.PENDING, nullable: true })
  statusPay: StatusOrderPay;

  @Column({ type: 'enum', enum: TypeNCF, default: TypeNCF.FINAL_CONSUMER, nullable: true })
  typeNcf: TypeNCF;

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.CASH, nullable: true })
  paymentMethod: PaymentMethod;

  @Column({comment: 'codigo que identifica el usuario que confirma el pago realizado:: cash, card, transfer', nullable: true})
  authorizationCode: string;

  @Column('numeric', { precision: 8, scale: 2, comment: 'monto pagado parcial o total', nullable: true, default: 0 })
  amountPaid: number;

  @Column({ nullable: true, comment: 'fecha en que fue entregada la orden' })
  deliverDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Subsidiary, subsidiary => subsidiary.order, { onDelete: 'RESTRICT' })
  subsidiary: Subsidiary;

  @OneToMany(() => Detail, detail => detail.order)
  detail: Detail[];

  @ManyToOne(() => User, user => user.order, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  user: User;

  @ManyToOne(() => Client, client => client.order, { onDelete: 'RESTRICT' })
  client: Client;
}
