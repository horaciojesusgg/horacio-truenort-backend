import { OperationsEnum } from '../constants/operations.enum'
import ICommand from '../util/command.interface'
import {commands} from '../record/command'

export default class OperationService {
    constructor() {
    }

    public processOperation(command: ICommand) {
        command.validate();
    }
}