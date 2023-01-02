import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, ManyToOne } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { User } from '../../authentication/users/entities/user.entity';
import { Subsidiary } from '../../company/subsidiary/entities/subsidiary.entity';


@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  // todo: analizar uso
  // @Column()
  // userId: number;

  @Column()
  personId: number;

  @Column()
  subsidiaryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Person, (person) => person.client, { onDelete: 'CASCADE' })
  person: Person;

  // @ManyToOne(() => User, (user) => user.client, { onDelete: 'SET NULL' })
  // user: User;

  @ManyToOne(() => Subsidiary, (subsidiary) => subsidiary.client, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  subsidiary: Subsidiary[];

}
