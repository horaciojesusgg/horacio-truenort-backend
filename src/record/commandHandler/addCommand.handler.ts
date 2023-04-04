import { autoInjectable } from "tsyringe";
import RecordRepository from "../record.repository";
import AddCommand from "../command/add.command";
import OperationRepository from "../../operation/operation.repository";
import { OperationsEnum } from "../../util/constants/operations.enum";

@autoInjectable()
export default class AddCommandHandler {
    constructor(private readonly recordRepository: RecordRepository, private readonly operationRepository: OperationRepository) {}

    public async handle(command: AddCommand) {
        command.validate();
        const sum = command.values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        await this.operationRepository.getByType(OperationsEnum.ADD);
        await this.recordRepository.create({user_balance: 0, userId: '', amount: 1, operation_response: sum.toString(), operationId: '' })
    }
}