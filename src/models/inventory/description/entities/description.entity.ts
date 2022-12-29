import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToOne
} from "typeorm";
import { Units } from "src/helpers/enums";
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 400, comment: "Descricion larga del producto", default: "no definido" })
  description: string;

  @Column({ length: 200, comment: "Presentacin de la muestra", nullable: true, default: "no definido" })
  display: string;

  @Column({ comment: "Altura de la muestra", nullable: true, default: 0 })
  height: number;

  @Column({ comment: "Ancho de la muestra", nullable: true, default: 0 })
  width: number;

  @Column({ type: 'enum', enum: Units, comment: "Tipo de unidad de las medidas", nullable: true, default: Units.IN })
  unit: Units;

  @Column({})
  productId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;


  @OneToOne((type) => Product, (product) => product.description)
  @JoinColumn()
  product: Product[];
}

