import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Record } from './Record'
import { User } from './User';
@Entity()
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  type: string;

  @Column()
  cost: number;

  @OneToMany(() => Record, (record) => record.operation)
  records: Record[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
