import ICommand from "../../util/command.interface";

export default class SquareRootCommand implements ICommand {
    constructor(public value: number) {}
    
    validate(): void {
        if (this.value < 0) {
            throw new Error('Value must be greater than zero');
        }
    }
}