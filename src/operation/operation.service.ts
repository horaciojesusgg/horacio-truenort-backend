import { OperationsEnum } from '../util/constants/operations.enum'
import ICommand from '../util/command.interface'

export default class OperationService {
    constructor() {
    }

    public processOperation(command: ICommand) {
        command.validate();
    }
}