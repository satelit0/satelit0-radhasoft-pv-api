import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class EmailSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true})
  email: string;

  @Column({length: 80})
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAd: Date;
}
