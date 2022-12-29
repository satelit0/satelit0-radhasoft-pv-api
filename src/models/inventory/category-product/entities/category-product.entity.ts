import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Product } from '../../products/entities/product.entity';

@Entity()
export class CategoryProduct {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  name: string;

  // @Column()
  // productId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany( () => Product, (product) => product.category, { onDelete: 'SET NULL', onUpdate: 'CASCADE'})
  product: Product;

}
