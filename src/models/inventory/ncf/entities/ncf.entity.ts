import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SerieNcf, TypeNCF } from '../../../../helpers/enums';
import { Subsidiary } from '../../../company/subsidiary/entities/subsidiary.entity';

@Entity()
export class Ncf {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;
 
  @Column()
  subsidiaryId: number;

  @Column({ type: 'enum', enum: SerieNcf, default: SerieNcf.B })
  serie: SerieNcf;

  @Column({ type: 'enum', enum: TypeNCF, default: TypeNCF.FINAL_CONSUMER })
  typeNcf: TypeNCF;

  @Column()
  sequence: number;

  @Column({ nullable: true })
  startSequence: number;

  @Column({ nullable: true })
  expirationDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Subsidiary, subsidiary => subsidiary.ncf, {onDelete: 'CASCADE'})
  subsidiary: Subsidiary;
}
