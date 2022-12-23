import { Roles } from "src/helpers/enums";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from "typeorm";
import { Person } from '../../../person/entities/person.entity';
import { Client } from '../../../client/entities/client.entity';
import { WorkingHours } from "src/models/entitys/entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  personId: number;

  @Column()
  roleId: number;

  @Column({ comment: 'sucursal a la que pertenese el usuario', nullable: true })
  subsidiaryId: number;

  @Column({ comment: 'dispositivos conocidos a los que tinene acceso el usuario para acceso al sistema', nullable: true })
  devicesId: number;

  @Column({ unique: true })
  userName: string;

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

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Person, (person: Person) => person.users)
  person: Person

  @OneToMany(() => Client, client => client.user, { onDelete: 'SET NULL' })
  client: Client;
}
