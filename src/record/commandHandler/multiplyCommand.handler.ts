import { autoInjectable } from "tsyringe";
import RecordRepository from "../../repository/record.repository";
import AddCommand from "../command/add.command";
import MultiplyCommand from "../command/multiply.command";

@autoInjectable()
export default class MultiplyCommandHandler {
    constructor(private readonly recordRepository: RecordRepository) {}

    public handle(command: MultiplyCommand) {
        command.validate();
        const result = command.values.reduce((total, num) => total * num, 1);
    }
}