import ICommand from '../../util/command.interface';
import { Operation } from '../../operation/operation.entity';
import config from '../../config';
import RandomOrg from 'random-org';

export interface RandomStringCommandPayload {
  amount: number;
  length: number;
}

export class RandomStringCommand implements ICommand {
  constructor(public payload: RandomStringCommandPayload, public operation: Operation) {}

  async execute(): Promise<string[]> {
    const random = new RandomOrg({ apiKey: config.randomOrg.apiKey });
    const result = await random.generateStrings({
      n: this.payload.amount,
      length: this.payload.length,
      characters: 'abcdefghijklmnopqrstuvwxyz',
    });
    return result.random.data;
  }

  validate(): void {
    throw new Error('Method not implemented.');
  }
}
