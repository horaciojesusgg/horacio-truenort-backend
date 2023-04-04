import ICommand from "../../util/command.interface";

export default class RandomStringCommand implements ICommand {

    constructor(amount: number, length: number, unique: boolean) {}

    validate(): void {
        throw new Error("Method not implemented.");
    }
}