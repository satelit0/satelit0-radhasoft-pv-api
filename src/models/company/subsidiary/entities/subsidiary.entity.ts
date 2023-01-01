import { OmitType } from '@nestjs/mapped-types';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { CompanyBase } from '../../company-base/entities/company-base.entity';
import { ContextCompany } from '../../company-utils';
import { Contact } from '../../../contact/entities/contact.entity';
import { Device } from '../../device/entities/device.entity';
import { Existence } from '../../../inventory/existence/entities/existence.entity';

@Entity()
export class Subsidiary extends ContextCompany {

  @Column()
  companyBaseId: number;

  @Column({ default: false, comment: 'si true, no es sucursal es oficina principal. Solo una debe ser true.' })
  headquarters: boolean;

  @ManyToOne(() => CompanyBase, (companyBase) => companyBase.subsidiary)
  companyBase: CompanyBase;

  @OneToOne(() => Contact, (contact) => contact.subsidiary)
  @JoinColumn()
  contact: Contact;

  @OneToMany(() => Device, (device) => device.subsidiary)
  device: Device[];

  @OneToOne(() => Existence, (existence) => existence.subsidiary)
  existence: Existence[];


}

