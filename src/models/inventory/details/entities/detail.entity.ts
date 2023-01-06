import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @Column()
  name: string;

  @Column('double precision', {default: 0})
  qty: number;

  @Column('numeric', {precision: 8, scale: 2})
  tax: number;

  @Column('numeric', { precision: 8, scale: 2})
  discount: number;

  @Column('numeric',{precision: 8, scale: 2})
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Order, order => order.detail, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // @JoinColumn()
  order: Order;

  @ManyToOne(() => Product, (product) => product.detail, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  product: Product[];

}
