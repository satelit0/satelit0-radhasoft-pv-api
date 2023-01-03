import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { Supplier } from "src/models/inventory/supplier/entities/supplier.entity";
import { Description } from '../../description/entities/description.entity';
import { Existence } from '../../existence/entities/existence.entity';
import { Exclude } from "class-transformer";
import { Category } from "src/models/inventory/category/entities/category.entity";
import { Detail } from '../../details/entities/detail.entity';
import { number } from "@hapi/joi";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  // @Column()
  // descriptionId: number;

  @Column({length: 25, comment: 'código unico de identificacion y busqueda', unique: true,}) 
  code: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 100, default: 'Generico', nullable: true })
  brand: string;

  @Column({ length: 100, nullable: true })
  lote?: string;

  @Column("text", { nullable: true })
  photo?: string[];

  @Column('numeric', { precision: 8, scale: 2 })
  cost: number;

  @Column('numeric', { precision: 8, scale: 2, nullable: true, default: 0 })
  tax: number;

  @Column({ default: false, nullable: true })
  taxExempt: boolean;

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

  @OneToOne(() => Description, (description) => description.product)
  description: Description;

  @OneToMany(() => Existence, (existence) => existence.product)
  existences: Existence[];

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @OneToMany(() => Detail, (detail) => detail.product, { onDelete: 'DEFAULT', onUpdate: 'CASCADE' })
  detail: Detail[];

  @ManyToMany(() => Supplier, )
  @JoinTable()
  suppliers: Supplier[];

  // @OneToOne((type) => Existence, (existence) => existence.product)
  // @JoinColumn()
  // existence: Existence;
}
