import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Person } from '../../person/entities/person.entity';
import { TypeNCF, OrderType } from '../../../helpers/enums';
import { Detail } from '../../details/entities/detail.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoiceNumber: number;

  @Column()
  clientId: number;

  @Column()
  userId: number;

  @Column( {
  type: 'enum',
  enum: OrderType,
  default: OrderType.cash
  })
  orderType: OrderType;

  @Column({
    type: "enum",
    enum: TypeNCF,
    default: TypeNCF["Consumidor Final"]
  })
  ncf: TypeNCF;

  @Column()
  deliverDate: Date;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToOne( () => Detail, (detail) => detail.order)
  // detail: Detail;

}
