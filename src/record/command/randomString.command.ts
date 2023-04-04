import ICommand from '../../util/command.interface';
import { Operation } from '../../operation/operation.entity';
import config from '../../config';

interface RandomStringCommandPayload {
  amount: number;
  length: number;
  unique: boolean;
}

export default class RandomStringCommand implements ICommand {
  constructor(payload: RandomStringCommandPayload, public operation: Operation) {}

  async execute(): Promise<string> {
    const response = await fetch(
      'https://www.random.org/strings/?num=1&len=10&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new',
    );
    console.log(await response.json());
    return 'TEST';
  }

  validate(): void {
    throw new Error('Method not implemented.');
  }
}
