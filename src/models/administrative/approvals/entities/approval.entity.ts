import { User } from 'src/models/authentication/users/entities/user.entity';
import { Column, Generated, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';
import { StatusApproval } from '../../../../helpers/enums';
import { Subsidiary } from '../../../company/subsidiary/entities/subsidiary.entity';

@Entity()
export class Approval {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  subsidiaryId: number;


  @Column({ comment: 'usuario que autoriza' })
  userAuthorizeId: number;

  @Column({ comment: 'usuario que solicita' })
  userRequestId: number;

  @Column('jsonb', { default: { target: 0 }, nullable: true })
  targetApproval: {};

  @Column({ length: 40, comment: 'codigo único de autorizacion', nullable: true })
  authorizationCode: string;

  @Column({ length: 500, comment: 'desglose o descripcion de la atorización' })
  reference: string;

  @Column({ type: 'enum', enum: StatusApproval, default: StatusApproval.PENDING, nullable: true })
  statusRequest: StatusApproval;

  @Column({ length: 300, comment: 'imagen del documento de referencia', nullable: true })
  photo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, user => user.approbalAuth, { onDelete: 'SET NULL' })
  userAuthorize: User;

  @ManyToOne(() => User, user => user.approbalRequest, { onDelete: 'SET NULL' })
  userRequest: User;
 
  @ManyToOne(() => Subsidiary, subsidiary => subsidiary.aproval, { onDelete: 'SET NULL' })
  subsidiary: Subsidiary;

  

}
