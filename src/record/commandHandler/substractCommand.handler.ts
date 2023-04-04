import { autoInjectable } from "tsyringe";
import RecordRepository from "../record.repository";
import DivideCommand from "../command/divide.command";
import SubstractCommand from "../command/substract.command";

@autoInjectable()
export default class SubstractCommandHandler {
    constructor(private readonly recordRepository: RecordRepository) {}

    public handle(command: SubstractCommand) {
        command.validate();
        const result = command.values.reduce((total, num) => total - num, 0);
    }
}