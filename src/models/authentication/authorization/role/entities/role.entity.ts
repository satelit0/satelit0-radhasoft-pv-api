import { Column, Generated, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Entity } from 'typeorm';
import { User } from '../../../users/entities/user.entity';

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  // @Generated('uuid')
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column('jsonb', {
    default: [
      { acction: [''], subject: [''], fields: [''], conditions: [''] },
      { acction: [''], subject: [''], fields: [''], conditions: [''] },
    ]
  })
  permissions: {};

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => User, user => user.role)
  user: User[];

}
