import { autoInjectable } from "tsyringe";
import RecordRepository from "../../repository/record.repository";
import AddCommand from "../command/add.command";

@autoInjectable()
export default class AddCommandHandler {
    constructor(private readonly recordRepository: RecordRepository) {}

    public handle(command: AddCommand) {
        command.validate();
        const sum = command.values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
    }
}