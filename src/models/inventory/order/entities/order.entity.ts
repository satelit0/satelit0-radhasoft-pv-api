import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, OneToOne, CreateDateColumn, 
  UpdateDateColumn, Generated, 
  DeleteDateColumn, 
  ManyToOne,
  OneToMany
} from "typeorm";
import { TypeNCF, OrderType } from '../../../../helpers/enums';
import { Detail } from "../../details/entities/detail.entity";
import { Ncf } from '../../ncf/entities/ncf.entity';
import { User } from '../../../authentication/users/entities/user.entity';
import { Client } from '../../../client/entities/client.entity';

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

  @Column(
    { type: "enum",enum: TypeNCF,default: TypeNCF["Consumidor Final"]}
  )
  typeNcf: TypeNCF;
  
  @Column() 
  ncf: string;

  @Column()
  deliverDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne( () => Detail, detail => detail.order)
  detail: Detail;

  @ManyToOne( () => User, user => user.order, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  user: User;

  @ManyToOne(() => Client, client => client.order)
  client: Client;
}
