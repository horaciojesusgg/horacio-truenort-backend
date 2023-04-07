import { OperationsEnum } from '../../operation/constants/operations.enum';
import { Operation } from '../../operation/operation.entity';
import ICommand from '../../util/command.interface';

export default class AddCommand implements ICommand {
  constructor(public values: number[], public operation: Operation) {}

  execute(): number {
    this.validate();
    const sum = this.values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum;
  }

  validate(): void {
    if (this.operation.type !== OperationsEnum.ADD) {
      throw new Error('Wrong operation type');
    }

    if (this.values.length === 0) {
      throw new Error('Array must not be empty');
    }
  }
}
