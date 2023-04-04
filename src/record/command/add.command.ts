import ICommand from "../../util/command.interface";

export default class AddCommand implements ICommand {
    constructor(public values: number[]) {}   
    validate(): void {
        if (this.values.length === 0) {
            throw new Error('Array must not be empty');
        }
    }

}