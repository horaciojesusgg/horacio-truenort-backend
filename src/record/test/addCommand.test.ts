import { OperationsEnum } from '../../operation/constants/operations.enum';
import { Operation } from '../../operation/operation.entity';
import AddCommand from '../command/add.command';

describe('AddCommand', () => {
  describe('execute', () => {
    it('should return the sum of the input values', () => {
    
      const values = [1, 2, 3];
      const op = new Operation();
      const addCommand = new AddCommand(values, op);
      const result = addCommand.execute();
      expect(result).toBe(6);
    });

    it('should throw an error if the input array is empty', () => {
      const values: number[] = [];
      const op = new Operation();

      const addCommand = new AddCommand(values, op);
      expect(() => addCommand.execute()).toThrowError('Array must not be empty');
    });
  });
});