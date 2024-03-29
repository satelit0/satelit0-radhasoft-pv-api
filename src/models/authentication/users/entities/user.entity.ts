import { Roles } from "src/helpers/enums";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinTable
} from "typeorm";
import { Person } from '../../../person/entities/person.entity';
import { Client } from '../../../client/entities/client.entity';
import { WorkingHours } from "src/models/entitys/entity";
import { ManyToMany } from 'typeorm';
import { Exclude, Expose } from "class-transformer";
import { Device } from "src/models/company/device/entities/device.entity";
import { Order } from '../../../inventory/order/entities/order.entity';
import { Approval } from "src/models/administrative/approvals/entities/approval.entity";
import { Role } from '../../authorization/role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  personId: number;

  // @Exclude()
  // @Column({ nullable: true })
  @Column({})
  roleId: number;

  @Column({ comment: 'sucursal a la que pertenese el usuario', nullable: true })
  subsidiaryId: number;

  // @Column({ comment: 'dispositivos conocidos a los que tinene acceso el usuario para acceso al sistema', nullable: true })
  // devicesId: number; 

  @Column({ unique: true })
  userName: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column('jsonb', {
    default: {
      hours: {
        startTime: '7:30:00',
        endTime: '17:00:00'
      },
      days: {
        sun: false,
        mon: true,
        tue: true,
        wen: true,
        thu: true,
        fri: true,
        sat: false
      }
    },
    comment: 'horario laboal y dias validos para acceso al sistema'
  })
  workingHours: WorkingHours;

  @Column({ nullable: true })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @Column({
    nullable: true,
  })
  @Exclude()
  currentHashedRefreshToken?: string;

  @Exclude()
  @Column({ nullable: true })
  twoFactorAuthenticationSecret?: string;

  @Exclude()
  @Column({ default: false })
  isTwoFactorAuthenticationEnabled: boolean;

  @Exclude()
  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Exclude()
  @Column({ default: false })
  isPhoneNumberConfirmed: boolean;

  @ManyToOne(() => Person, (person: Person) => person.users)
  person: Person

  @OneToMany(() => Order, order => order.user,)
  order: Order;

  @ManyToMany(() => Device)
  @JoinTable()
  devices: Device[];

  @OneToMany(() => Approval, approval => approval.userAuthorize)
  approbalAuth: Approval;

  @OneToMany(() => Approval, approval => approval.userRequest)
  approbalRequest: Approval;

  @ManyToOne(() => Role, role => role.user, { onDelete: 'SET NULL', onUpdate: 'CASCADE', createForeignKeyConstraints: true })
  role: Role;
}
