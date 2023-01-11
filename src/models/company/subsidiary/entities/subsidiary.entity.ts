import { OmitType } from '@nestjs/mapped-types';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { CompanyBase } from '../../company-base/entities/company-base.entity';
import { ContextCompany } from '../../company-utils';
import { Contact } from '../../../contact/entities/contact.entity';
import { Device } from '../../device/entities/device.entity';
import { Existence } from '../../../inventory/existence/entities/existence.entity';
import { Client } from '../../../client/entities/client.entity';
import { Order } from '../../../inventory/order/entities/order.entity';
import { Ncf } from '../../../inventory/ncf/entities/ncf.entity';
import { Approval } from '../../../administrative/approvals/entities/approval.entity';

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

  @OneToMany(() => Client, (client) => client.subsidiary)
  client: Client;

  @OneToMany(() => Order, (order) => order.subsidiary)
  order: Order[];

  @OneToMany(() => Ncf, ncf => ncf.subsidiary)
  ncf: Ncf;
  
  @OneToMany(() => Approval, approval => approval.subsidiary)
  aproval: Approval[];

}

