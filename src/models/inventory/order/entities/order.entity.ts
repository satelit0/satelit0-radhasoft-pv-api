import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, OneToOne, CreateDateColumn, 
  UpdateDateColumn, Generated, 
  DeleteDateColumn 
} from "typeorm";
import { Person } from '../../../person/entities/person.entity';
import { TypeNCF, OrderType } from '../../../../helpers/enums';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ comment: "numero auto generado para el numero de factura"})
  @Generated('increment')
  invoiceNumber: number;
  
  @Column()
  userId: number;
 
  @Column()
  clientId: number;

  @Column( {
  type: 'enum',
  enum: OrderType,
  default: OrderType.CASH
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

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  
  // @OneToOne( () => Detail, (detail) => detail.order)
  // detail: Detail;
}
