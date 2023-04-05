import ICommand from '../../util/command.interface';
import { Operation } from '../../operation/operation.entity';

export default class SubstractCommand implements ICommand {
  constructor(public minuend: number, public substrahend: number, public operation: Operation) {}

  execute(): number {
    this.validate();
    const result = this.minuend - this.substrahend;
    return result;
  }

  validate(): void {
    return;
  }
}
