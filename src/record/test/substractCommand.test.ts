import { Operation } from '../../operation/operation.entity';
import { OperationsEnum } from '../../operation/constants/operations.enum';
import SubstractCommand from '../command/substract.command';

describe('SubstractCommand', () => {
  let command: SubstractCommand;
  const operation = new Operation();
  operation.type = OperationsEnum.SUBSTRACT;

  beforeEach(() => {
    command = new SubstractCommand(10, 5, operation);
  });

  it('should correctly subtract two numbers', () => {
    const result = command.execute();
    expect(result).toBe(5);
  });

  it('should throw an error if the operation type is not Substract', () => {
    const invalidOperation = new Operation();
    invalidOperation.type = OperationsEnum.ADD;

    expect(() => {
      command = new SubstractCommand(10, 5, invalidOperation);
      command.validate();
    }).toThrowError('Wrong operation type');
  });
});