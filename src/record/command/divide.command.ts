import ICommand from "../../util/command.interface";

export default class DivideCommand implements ICommand {

    constructor(public dividend: number, public divisor: number) {}

    validate(): void {
        if (this.divisor === 0) {
            throw new Error("Can't divide by zero");
        }
    }
}