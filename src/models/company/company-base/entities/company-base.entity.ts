import { Column, CreateDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Contact } from '../../../contact/entities/contact.entity';
import { ContextCompany } from '../../company-utils';
import { Subsidiary } from '../../subsidiary/entities/subsidiary.entity';

@Entity()
export class CompanyBase extends ContextCompany{

  @Column({length: 20})
  rnc: string;

  @Column({length: 300})
  logo: string;
  
  @OneToOne(() =>  Contact, (contact) => contact.companyBase, ) //{onDelete: 'SET NULL',}
  @JoinColumn()
  contact: Contact;

  @OneToMany( () => Subsidiary, (subsidiary) => subsidiary.companyBase )
  subsidiary: Subsidiary[];
}
