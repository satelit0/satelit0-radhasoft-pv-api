import {
  Column, CreateDateColumn,
  DeleteDateColumn, Entity,
  Generated, ManyToOne,
  OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { IsEmail } from "class-validator"
import { Person } from '../../person/entities/person.entity';
import { Address, GeoLocation, Phone, SocialNetworks } from "src/models/entitys/entity";
import { Exclude, Expose } from "class-transformer";
import { CompanyBase } from "src/models/company/company-base/entities/company-base.entity";
import { Subsidiary } from "src/models/company/subsidiary/entities/subsidiary.entity";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  contactId: string;

  @Column('jsonb', { nullable: true })
  phones: Phone;

  @Column('jsonb', { nullable: true })
  socialNetworks: SocialNetworks;

  @Column({ length: 80, unique: true, nullable: true, default: null })
  email: string;

  @Column('jsonb', { nullable: true })
  geoLocation: GeoLocation;

  @Column({ nullable: true, default: 0 })
  municipalityId: number;

  @Column({ nullable: true, default: 0 })
  provinceId: number;

  @Column('jsonb', { nullable: true })
  address: Address;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Person, (person) => person.contact, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  person: Person;

  @OneToOne(() => CompanyBase, (companyBase) => companyBase.contact, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  companyBase: CompanyBase;

  @OneToOne(() => Subsidiary, (subsidiary) => subsidiary.contact, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  subsidiary: Subsidiary;

}
