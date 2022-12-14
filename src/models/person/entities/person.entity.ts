import  { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';
import { Contact } from "../../contact/entities/contact.entity";
import { Supplier } from '../../supplier/entities/supplier.entity';
import { Roles } from '../../../helpers/enums';

@Entity()
export class Person {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 50, nullable: true})
  firstName: string;
  
  @Column({length: 50, nullable: true})
  lastName: string;

  @Column({nullable: true})
  birthday: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.person)
  users: User[];

  @OneToMany( () => Contact, (contact) => contact.person)
  contac: Contact;

  @OneToMany(() => Supplier, (supplier) => supplier.person)
  supplier: Supplier;


}
