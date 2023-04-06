import ICommand from '../../util/command.interface';
import { Operation } from '../../operation/operation.entity';
import { OperationsEnum } from '../../operation/constants/operations.enum';

export default class SquareRootCommand implements ICommand {
  constructor(public value: number, public operation: Operation) {}

  execute(): number {
    this.validate();
    const result = Math.sqrt(this.value);
    return result;
  }

  validate(): void {
    if (this.operation.type !== OperationsEnum.SQUARE_ROOT) {
      throw new Error('Wrong operation type');
    }
    if (this.value < 0) {
      throw new Error('Value must be greater than zero');
    }
  }
}
