import { OperationsEnum } from './constants/operations.enum';
import ICommand from '../util/command.interface';
import OperationRepository from './operation.repository';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class OperationService {
  constructor(private readonly repository: OperationRepository) {}

  public processOperation(command: ICommand) {
    command.validate();
  }

  public async getByType(type: OperationsEnum) {
    return this.repository.getByType(type);
  }
}
