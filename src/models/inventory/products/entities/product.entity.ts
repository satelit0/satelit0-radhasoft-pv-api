import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Supplier } from "src/models/inventory/supplier/entities/supplier.entity";
import { DescriptionProduct } from '../../../description-product/entities/description-product.entity';
import { Existence } from '../../existence/entities/existence.entity';
import { Exclude } from "class-transformer";
import { CategoryProduct } from "src/models/inventory/category-product/entities/category-product.entity";
import { Detail } from '../../details/entities/detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column()
  descriptionId: number;
 
  @Column()
  existenceId: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 100, default: 'Generico', nullable: true })
  brand: string;

  @Column({ length: 100 })
  lote: string;

  @Column("text", { nullable: true })
  photo?: string[];

  @Column('numeric', { precision: 8, scale: 2 })
  cost: number;

  @Column('numeric', { precision: 8, scale: 2 })
  price: number;

  @Column('jsonb', {
    nullable: true,
    default: {
      descount_1: { percent: 0.0, qtyMin: 1 },
      descount_2: { percent: 0.0, qtyMin: 2 },
      descount_3: { percent: 0.0, qtyMin: 3 }
    }
  })
  discount?: {};

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @ManyToOne(() => DescriptionProduct, (descriptionProduct) => descriptionProduct.description, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  description: DescriptionProduct;

  @ManyToOne(() => CategoryProduct, (category) => category.product)
  category: CategoryProduct;

  @OneToMany(() => Detail, (detail) => detail.product, { onDelete: 'DEFAULT', onUpdate: 'CASCADE' })
  detail: Detail[];

  @ManyToMany(() => Supplier, { onDelete: 'SET NULL' })
  @JoinTable()
  suppliers: Supplier[];

  @OneToMany(() => Existence, (existence) => existence.product, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  existence: Existence[];
}
