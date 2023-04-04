import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Operation } from '../operation/operation.entity';
import { User } from '../user/user.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @ManyToOne(() => User, (user) => user.records)
  user: User;

  @ManyToOne(() => Operation, (operation) => operation.records)
  operation: Operation;

  @Column()
  amount: number;

  @Column()
  user_balance: number;

  @Column()
  operation_response: string;

  @Column()
  userId: string;

  @Column()
  operationId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
