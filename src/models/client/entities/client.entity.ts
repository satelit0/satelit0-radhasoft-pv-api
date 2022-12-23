import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, ManyToOne } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { User } from '../../authentication/users/entities/user.entity';


@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

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

  @ManyToOne( () => Person, (person) => person.client)
  person: Person;

  @ManyToOne( () => User, (user) => user.client, {onDelete: 'SET NULL'} )
  user: User;

}
