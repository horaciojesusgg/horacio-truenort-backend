import { autoInjectable } from "tsyringe";
import RecordRepository from "../record.repository";
import AddCommand from "../command/add.command";
import MultiplyCommand from "../command/multiply.command";
import OperationRepository from "../../operation/operation.repository";

@autoInjectable()
export default class MultiplyCommandHandler {
    constructor(private readonly recordRepository: RecordRepository, private readonly operationRepository: OperationRepository) {}

    public handle(command: MultiplyCommand) {
        command.validate();
        const result = command.values.reduce((total, num) => total * num, 1);
    }
}