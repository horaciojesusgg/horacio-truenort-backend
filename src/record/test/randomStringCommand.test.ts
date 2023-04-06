import { RandomStringCommand, RandomStringCommandPayload } from '../command/randomString.command';
import { Operation } from '../../operation/operation.entity';
import config from '../../config';
import RandomOrg from 'random-org';
import { OperationsEnum } from '../../operation/constants/operations.enum';

jest.mock('random-org');

describe('RandomStringCommand', () => {
  const mockRandomOrgData = ['abc', 'def', 'ghi'];
  const mockRandomOrgGenerateStrings = jest.fn().mockResolvedValue({ random: { data: mockRandomOrgData } });
  const mockRandomOrgConstructor = jest.fn().mockImplementation(() => {
    return { generateStrings: mockRandomOrgGenerateStrings };
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    RandomOrg.mockImplementation(mockRandomOrgConstructor);
  });

  describe('execute', () => {
    it('should return an array of random strings with the specified length and amount', async () => {
      const payload: RandomStringCommandPayload = { amount: 3, length: 3 };
      const operation = new Operation();
      operation.type = OperationsEnum.RANDOM_STRING
      const randomStringCommand = new RandomStringCommand(payload, operation);

      const result = await randomStringCommand.execute();
      expect(result).toEqual(mockRandomOrgData);

      expect(mockRandomOrgConstructor).toHaveBeenCalledWith({ apiKey: config.randomOrg.apiKey });
      expect(mockRandomOrgGenerateStrings).toHaveBeenCalledWith({
        n: payload.amount,
        length: payload.length,
        characters: 'abcdefghijklmnopqrstuvwxyz',
      });
    });
  });

  describe('validate', () => {
    it('should throw an error if validate is called', () => {
      const payload: RandomStringCommandPayload = { amount: 3, length: 3 };
      const operation = new Operation();
      const randomStringCommand = new RandomStringCommand(payload, operation);
      expect(() => randomStringCommand.validate()).toThrowError('Method not implemented.');
    });
  });
});