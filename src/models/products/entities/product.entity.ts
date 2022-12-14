import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Supplier } from "src/models/supplier/entities/supplier.entity";
import { DescriptionProduct } from '../../description-product/entities/description-product.entity';
import { CategoryProduct } from '../../category-product/entities/category-product.entity';
import { Detail } from '../../details/entities/detail.entity';
import { ProductsSupplier } from '../../products-suppliers/entities/products-supplier.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column()
  descriptionId: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 100, default: 'Generico', nullable: true })
  brand: string;

  @Column({ length: 100 })
  lote: string;

  @Column("simple-array", { nullable: true })
  photo: string[];

  @Column()
  dateEntry: Date;

  @Column()
  dateExpire: Date;

  @Column("numeric", { precision: 8, scale: 2 })
  cost: number;

  @Column("simple-array")
  price: number[];

  @Column('double precision', { default: 0 , })
  qty: number; 

  @Column('simple-json', { default: { 
    "price_1":{"percent": 0, "qtyMin": 0},
    "price_2":{"percent": 0, "qtyMin": 0},
    "price_3":{"percent": 0, "qtyMin": 0}
  }})
  discount: {"price_1":{"percent": number, "qtyMin": number},};

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => DescriptionProduct, (descriptionProduct) => descriptionProduct.description)
  description: DescriptionProduct;

  @ManyToOne(() => CategoryProduct, (category) => category.product)
  category: CategoryProduct;
  
  @OneToMany(() => Detail, (detail) => detail.product)
  detail: Detail[];
  
  @OneToMany( () => ProductsSupplier, (productSupplier) => productSupplier.product)
  productsSuppliers: ProductsSupplier[];
}
