import MultiplyCommand from '../command/multiply.command';
import { Operation } from '../../operation/operation.entity';
import { OperationsEnum } from '../../operation/constants/operations.enum';

describe('MultiplyCommand', () => {
  describe('execute', () => {
    it('should return the product of the input values', () => {
      const values = [2, 3, 4];
      const operation = new Operation();
      operation.type = OperationsEnum.MULTIPLY
      const multiplyCommand = new MultiplyCommand(values, operation);
      const result = multiplyCommand.execute();
      expect(result).toBe(24);
    });

    it('should return 1 if the input array is empty', () => {
      const values: number[] = [];
      const operation = new Operation();
      operation.type = OperationsEnum.MULTIPLY
      const multiplyCommand = new MultiplyCommand(values, operation);
      const result = multiplyCommand.execute();
      expect(result).toBe(1);
    });
  });

  describe('validate', () => {
    it('should throw an error if the operation type is not MULTIPLY', () => {
      const values = [2, 3, 4];
      const operation = new Operation();
      const multiplyCommand = new MultiplyCommand(values, operation);
      expect(() => multiplyCommand.validate()).toThrowError('Wrong operation type');
    });

    it('should throw an error if the input array is empty', () => {
      const values: number[] = [];
      const operation = new Operation();
      operation.type = OperationsEnum.MULTIPLY
      const multiplyCommand = new MultiplyCommand(values, operation);
      expect(() => multiplyCommand.validate()).toThrowError('Array must not be empty');
    });
  });
});