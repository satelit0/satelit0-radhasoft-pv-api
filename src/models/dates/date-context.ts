import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class DateContext {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
