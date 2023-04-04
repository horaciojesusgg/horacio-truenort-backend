import { autoInjectable } from "tsyringe";
import RecordRepository from "../record.repository";
import DivideCommand from "../command/divide.command";
import SquareRootCommand from "../command/squareRoot.command";

@autoInjectable()
export default class SquareRootCommandHandler {
    constructor(private readonly recordRepository: RecordRepository) {}

    public handle(command: SquareRootCommand) {
        command.validate();
        const result = Math.sqrt(command.value);
    }
}