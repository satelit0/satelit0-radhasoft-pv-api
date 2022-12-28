import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Supplier } from "src/models/supplier/entities/supplier.entity";
import { DescriptionProduct } from '../../description-product/entities/description-product.entity';
import { CategoryProduct } from '../../category-product/entities/category-product.entity';
import { Detail } from '../../details/entities/detail.entity';
import { Existence } from '../../inventory/existence/entities/existence.entity';
import { Exclude } from "class-transformer";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column()
  descriptionId: number;

  @Column()
  subsidiaryExistenceId: number;

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

  @Column("text", { array: true })
  price: number[];

  @Column('jsonb', {
    default: {
      "price_1": { "percent": 0, "qtyMin": 0 },
      "price_2": { "percent": 0, "qtyMin": 0 },
      "price_3": { "percent": 0, "qtyMin": 0 }
    }
  })
  discount: { "price_1": { "percent": number, "qtyMin": number }, };


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
