import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';


@Entity()
export class Existence {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  subsidiaryId: number;

  @Column('double precision', { default: 0 , comment:'cantidad de existencia'})
  qty: number; 

  @Column()
  dateEntry: Date;

  @Column()
  dateExpire: Date;
 
  @Column({ default: true })
  isActive: boolean; 

  @Column()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne( () => Product, (product) => product.existence, {onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  product: Product  
}
