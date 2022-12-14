import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn
} from "typeorm";
import { Units } from "src/helpers/enums";
import { Product } from '../../products/entities/product.entity';

@Entity()
export class DescriptionProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 400, comment: "Descricion larga del producto"})
  description: string;

  @Column({length: 200, comment: "Presentacin de la muestra", nullable: true})
  display: string;
  
  @Column({comment: "Altura de la muestra", nullable: true})
  height: number;
  
  @Column({comment: "Ancho de la muestra", nullable: true})
  width: number;
  
  @Column({ type: 'enum', enum: Units, comment: "Tipo de unidad de las medidas", nullable: true})
  unit: Units;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany( () => Product, (product) => product.description)
  product: Product[];
}

