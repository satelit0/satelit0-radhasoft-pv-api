import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail } from "class-validator"
import { Supplier } from 'src/models/supplier/entities/supplier.entity';
import { Person } from '../../person/entities/person.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  contactId: string;

  @Column()
  personId: number;

  @Column("simple-array", { nullable: true})
  phones: string[];

  @Column("simple-array", { nullable: true, })
  cellPhone: string[];

  @Column({ length: 80 })
  @IsEmail()
  email: string;

  @Column("simple-json", { nullable: true})
  coordinates: {log: number, lat: number};

  @Column({ nullable: true})
  municipalityId: number;

  @Column({ nullable: true})
  provinceId: number;

  @Column("simple-json", { nullable: true})
  address: {street: string, building: string, apto: string, numberApto: string};

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne( () => Person, (person) => person.contac)
  person: Person;
}
