import SquareRootCommand from '../command/squareRoot.command';
import { Operation } from '../../operation/operation.entity';
import { OperationsEnum } from '../../operation/constants/operations.enum';

describe('SquareRootCommand', () => {
  const operation = new Operation();
  operation.type = OperationsEnum.SQUARE_ROOT
  it('should return the square root of a positive number', () => {
    const command = new SquareRootCommand(4, operation);
    expect(command.execute()).toEqual(2);
  });

  it('should throw an error when the value is negative', () => {
    const command = new SquareRootCommand(-4, operation);
    expect(() => command.execute()).toThrow('Value must be greater than zero');
  });

  it('should throw an error when the operation type is wrong', () => {
    const operation = new Operation();
    operation.type = OperationsEnum.ADD
    const command = new SquareRootCommand(4, operation);
    expect(() => command.execute()).toThrow('Wrong operation type');
  });
});