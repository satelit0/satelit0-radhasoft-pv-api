import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receivable {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column()
  orderId: number;


}
