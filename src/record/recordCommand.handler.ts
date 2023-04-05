import { autoInjectable } from 'tsyringe';
import { Operation } from '../operation/operation.entity';
import { User } from '../user/user.entity';
import ICommand from '../util/command.interface';
import RecordRepository from './record.repository';

@autoInjectable()
export default class RecordCommandHandler {
  constructor(private readonly recordRepository: RecordRepository) {}

  public async handle(command: ICommand, user: User) {
    const operationResult = command.execute();
    const calculatedUserBalance = await this.calculateUserBalance(command.operation, user.id);
    const record = await this.recordRepository.create({
      userId: user.id,
      operationId: command.operation.id,
      user_balance: calculatedUserBalance,
      operation_response: operationResult.toString(),
      amount: 1,
    });
  }

  private async calculateUserBalance(operation: Operation, userId: string): Promise<number> {
    const latestRecord = await this.recordRepository.findLatest(userId);
    if (!latestRecord) throw new Error('Balance is not initialized');
    const operationCost = operation.cost;
    const newBalance = latestRecord?.user_balance - operationCost;
    if (newBalance < 0) {
      throw new Error('Insuficient funds to perform this operation');
    }
    return newBalance;
  }
}
