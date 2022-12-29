import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from "typeorm";
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 300, nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Product, (product) => product.category, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  product: Product;

}
