import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../products/entities/product.entity';


@Entity()
export class SubsidiaryExistence {
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

  @DeleteDateColumn()
  deletedAt: Date;


  @ManyToOne( () => Product, (product) => product.subsidiaryExistence, {onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  product: Product  
}
