import { OperationsEnum } from './constants/operations.enum';
import ICommand from '../util/command.interface';
import OperationRepository from './operation.repository';
import { autoInjectable } from 'tsyringe';
import { Operation } from './operation.entity';

interface ISymbolMap {
  [key: string]: OperationsEnum;
}

interface ISymbolToOperationMap {
  [key: string]: Operation;
}

@autoInjectable()
export default class OperationService {
  constructor(private readonly repository: OperationRepository) {}

  public async calculateArithmeticalOperationCost(expression: string): Promise<number> {
    let result = 0;

    let map: ISymbolToOperationMap = {};
    const operationMap = this.getSymbolToOperationEnumMap();
    for (let i = 0; i < expression.length; i++) {
      const operationEnum = operationMap[expression[i]];
      if (!operationEnum) {
        continue;
      }

      if (!map[expression[i]]) {
        const operation = await this.getByType(operationEnum);
        if (!operation) continue;
        map[expression[i]] = operation;
      }

      result += map[expression[i]].cost;
    }
    return result;
  }

  public async getByType(type: OperationsEnum) {
    const operation = await this.repository.getByType(type);
    if (!operation) throw new Error('');
    return operation;
  }

  private getSymbolToOperationEnumMap(): ISymbolMap {
    return {
      '+': OperationsEnum.ADD,
      '-': OperationsEnum.SUBSTRACT,
      '*': OperationsEnum.MULTIPLY,
      '/': OperationsEnum.DIVIDE,
      '√': OperationsEnum.SQUARE_ROOT,
    };
  }
}
