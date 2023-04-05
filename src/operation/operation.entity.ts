import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Record } from '../record/record.entity';

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
