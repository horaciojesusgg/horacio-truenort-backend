import { autoInjectable } from "tsyringe";
import RecordRepository from "../record.repository";
import DivideCommand from "../command/divide.command";
import OperationRepository from "../../operation/operation.repository";

@autoInjectable()
export default class DivideCommandHandler {
    constructor(private readonly recordRepository: RecordRepository, private readonly operationRepository: OperationRepository) {}

    public handle(command: DivideCommand) {
        command.validate();
        const result = command.dividend / command. divisor;

    }
}