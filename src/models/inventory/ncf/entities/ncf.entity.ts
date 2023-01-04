import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SerieNcf, TypeNCF } from '../../../../helpers/enums';

@Entity()
export class Ncf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SerieNcf, default: SerieNcf.B })
  serie: SerieNcf;

  @Column({ type: 'enum', enum: TypeNCF, default: TypeNCF.FINAL_CONSUMER })
  typeNcf: TypeNCF;

  @Column()
  sequence: number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date; 
}
