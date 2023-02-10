import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DateContext } from '../../models/dates/date-context';

@Entity() 
export class Event extends DateContext {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { nullable: true })
  payLoad: {}

}
