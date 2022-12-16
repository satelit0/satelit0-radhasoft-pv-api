import { Roles } from "src/helpers/enums";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";
import { Person } from '../../person/entities/person.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  personId: number;
  
  @Column()
  roleId:number;

  @Column()
  userName: string;

  @Column({nullable: true})
  password: string;

  // @Column({
  //   type: "enum",
  //   enum: Roles,
  //   default: Roles.USER,
  //   nullable: true
  // })
  // role: Roles;

  @Column({nullable: true})
  lastLogin: Date;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAdt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne( () => Person, (person: Person) => person.users)
  person: Person
}
