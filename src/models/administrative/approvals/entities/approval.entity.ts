import { Column, Generated, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class Approval {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column({ comment: 'usuario que autoriza' })
  userId: number;

  @Column({ length: 40, comment: 'codigo unico de autorizacion' })
  authorizationCode: string;

  @Column({ length: 500, comment: 'desglose o descripcion de la atorización' })
  reference: string;

  @Column({ length: 300, comment: 'imagen del documento de referencia', nullable: true })
  photo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}
