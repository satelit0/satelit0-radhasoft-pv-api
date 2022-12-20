import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';


@Entity()
export class ProductsSupplier {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  supplierId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product: Product) => product.productsSuppliers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  product: Product[];

  @ManyToOne(() => Supplier, (supplier) => supplier.suppliersProducts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  supplier: Supplier[];



}
