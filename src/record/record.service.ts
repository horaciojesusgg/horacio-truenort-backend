import { autoInjectable } from 'tsyringe';
import RecordCommandHandler from './recordCommand.handler';
import SubstractCommand from './command/substract.command';
import MultiplyCommand from './command/multiply.command';
import DivideCommand from './command/divide.command';
import SquareRootCommand from './command/squareRoot.command';
import { RandomStringCommand, RandomStringCommandPayload } from './command/randomString.command';
import AddCommand from './command/add.command';
import OperationService from '../operation/operation.service';
import { OperationsEnum } from '../operation/constants/operations.enum';
import { User } from '../user/user.entity';
import RecordRepository from './record.repository';
@autoInjectable()
export default class RecordService {
  constructor(
    private readonly commandHandler: RecordCommandHandler,
    private readonly operationService: OperationService,
    private readonly recordRepository: RecordRepository,
  ) {}

  public async generateRandomString(params: RandomStringCommandPayload, user: User) {
    const squareRootOperation = await this.operationService.getByType(OperationsEnum.RANDOM_STRING);
    const squareRootCommand = new RandomStringCommand(params, squareRootOperation);
    return await this.commandHandler.handle(squareRootCommand, user);
  }

  public async solveSquareRoot(value: number, user: User) {
    const squareRootOperation = await this.operationService.getByType(OperationsEnum.SQUARE_ROOT);
    const squareRootCommand = new SquareRootCommand(value, squareRootOperation);
    return await this.commandHandler.handle(squareRootCommand, user);
  }

  public async evaluateExpressionMDAS(expression: string, user: User): Promise<number> {
    if (!this.canPerformOperation(expression, user.id)) throw new Error('Insuficient funds to perform this operation');

    const addOperation = await this.operationService.getByType(OperationsEnum.ADD);
    const substractOperation = await this.operationService.getByType(OperationsEnum.SUBSTRACT);
    const multiplyOperation = await this.operationService.getByType(OperationsEnum.MULTIPLY);
    const divideOperation = await this.operationService.getByType(OperationsEnum.DIVIDE);
    // Split the expression into an array of individual terms
    const terms: string[] = expression.split(/([+\-*/])/);

    // Then, we initialize a variable to keep track of the total value
    let total: number = 0;

    // Perform all multiplication and division operations
    for (let i = 0; i < terms.length; i++) {
      const term = terms[i];
      if (term === '*' || term === '/') {
        const leftOperand = parseFloat(terms[i - 1]);
        const rightOperand = parseFloat(terms[i + 1]);

        let result = 0;
        if (term === '*') {
          const multiplyCommand = new MultiplyCommand([leftOperand, rightOperand], multiplyOperation);
          this.commandHandler.handle(multiplyCommand, user);
          result = multiplyCommand.execute();
        } else {
          const divideCommand = new DivideCommand(leftOperand, rightOperand, divideOperation);
          this.commandHandler.handle(divideCommand, user);
          result = divideCommand.execute();
        }
        terms.splice(i - 1, 3, result.toString());
        i -= 2;
      }
    }

    // Perform all addition and subtraction operations
    for (let i = 0; i < terms.length; i++) {
      const term = terms[i];
      const isOperator: boolean = ['+', '-'].includes(term);

      if (isOperator) {
        const leftOperand = parseFloat(terms[i - 1]);
        const rightOperand = parseFloat(terms[i + 1]);

        let result = 0;
        if (term === '+') {
          const addCommand = new AddCommand([leftOperand, rightOperand], addOperation);
          this.commandHandler.handle(addCommand, user);
          result = addCommand.execute();
        } else {
          const substractCommand = new SubstractCommand(leftOperand, rightOperand, substractOperation);
          this.commandHandler.handle(substractCommand, user);
          result = substractCommand.execute();
        }

        terms.splice(i - 1, 3, result.toString());
        i -= 2;
      }
    }

    total = parseFloat(terms[0]);
    return total;
  }

  private async canPerformOperation(expression: string, userId: string) {
    const cost = await this.operationService.calculateArithmeticalOperationCost(expression);
    const latestRecord = await this.recordRepository.findLatest(userId);
    if (!latestRecord) return false;
    return latestRecord?.user_balance >= cost;
  }
}
