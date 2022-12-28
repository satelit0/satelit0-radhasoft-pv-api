import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Product } from '../../products/entities/product.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  personId: number;

  @Column({length: 30, comment: "Registro nacional del contribuyente"})
  rnc: string;
  
  // @Column({length: 150, comment: "Nombre de la empresa, el suplidor"})
  // name: string;

  @Column({nullable: true, length: 200, default: "Generico", comment: "Nombre de la empresa, el suplidor"})
  nameEntity: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne( () => Person, (person) => person.supplier)
  person: Person;

  // @OneToMany(() => ProductsSupplier, (productsSupplier) => productsSupplier.supplier, )
  // suppliersProducts: ProductsSupplier[];
}
