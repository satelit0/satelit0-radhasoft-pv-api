import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated, DeleteDateColumn } from "typeorm";

export abstract class ContextCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;
 
  @Column()
  contactId: number;

  @Column({length: 100})
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}