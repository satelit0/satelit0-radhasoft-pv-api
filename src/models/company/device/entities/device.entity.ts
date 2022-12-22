import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, ManyToOne } from 'typeorm';
import { Subsidiary } from '../../subsidiary/entities/subsidiary.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ comment: 'sucursal a la que pertenece el disposotivo' })
  subsidiaryId: number;

  @Column('text', {
       array: true, 
    })
  macAddress: string[] ;

  @Column({ length: 50 })
  operativeSystem: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne( () => Subsidiary, (subsidiary) => subsidiary.device)
  subsidiary: Subsidiary;  
}
