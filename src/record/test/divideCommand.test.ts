import DivideCommand from '../command/divide.command';
import { Operation } from '../../operation/operation.entity';
import { OperationsEnum } from '../../operation/constants/operations.enum';

describe('DivideCommand', () => {
  describe('execute', () => {
    it('should return the quotient of the dividend divided by the divisor', () => {
      const dividend = 10;
      const divisor = 2;
      const operation = new Operation();
      operation.type = OperationsEnum.DIVIDE
      const divideCommand = new DivideCommand(dividend, divisor, operation);
      const result = divideCommand.execute();
      expect(result).toBe(5);
    });

    it('should throw an error if the divisor is zero', () => {
      const dividend = 10;
      const divisor = 0;
      const operation = new Operation();
      operation.type = OperationsEnum.DIVIDE
      const divideCommand = new DivideCommand(dividend, divisor, operation);
      expect(() => divideCommand.execute()).toThrowError("Can't divide by zero");
    });
  });

  describe('validate', () => {
    it('should throw an error if the operation type is not DIVIDE', () => {
      const dividend = 10;
      const divisor = 2;
      const operation = new Operation();
      const divideCommand = new DivideCommand(dividend, divisor, operation);
      expect(() => divideCommand.validate()).toThrowError('Wrong operation type');
    });
  });
});