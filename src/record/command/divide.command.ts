import { Operation } from '../../operation/operation.entity';
import ICommand from '../../util/command.interface';
import { OperationsEnum } from '../../util/constants/operations.enum';

export default class DivideCommand implements ICommand {
  constructor(public dividend: number, public divisor: number, public operation: Operation) {}

  execute(): number {
    this.validate();
    const result = this.dividend / this.divisor;
    return result;
  }

  validate(): void {
    if (this.operation.type !== OperationsEnum.DIVIDE) {
      throw new Error('Wrong operation type');
    }

    if (this.divisor === 0) {
      throw new Error("Can't divide by zero");
    }
  }
}
