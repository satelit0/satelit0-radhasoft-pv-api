import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, JoinColumn } from "typeorm";
import { User } from '../../authentication/users/entities/user.entity';
import { Contact } from "../../contact/entities/contact.entity";
import { Supplier } from '../../inventory/supplier/entities/supplier.entity';
import { Roles } from '../../../helpers/enums';
import { Client } from '../../client/entities/client.entity';

@Entity()
export class Person {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: true })
  identity: string;

  @Column()
  contactId: number;

  @Column({ length: 50, nullable: true })
  firstName?: string;

  @Column({ length: 50, nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  birthday?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => User, (user) => user.person)
  users: User[];

  @OneToOne(() => Contact, (contact) => contact.person)
  @JoinColumn()
  contact: Contact;

  @OneToMany(() => Supplier, (supplier) => supplier.person)
  supplier: Supplier;

  @OneToMany(() => Client, (client) => client.person)
  client: Client;

}
