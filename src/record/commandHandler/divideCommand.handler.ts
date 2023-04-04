import { autoInjectable } from "tsyringe";
import RecordRepository from "../../repository/record.repository";
import DivideCommand from "../command/divide.command";

@autoInjectable()
export default class DivideCommandHandler {
    constructor(private readonly recordRepository: RecordRepository) {}

    public handle(command: DivideCommand) {
        command.validate();
        const result = command.dividend / command. divisor;

    }
}