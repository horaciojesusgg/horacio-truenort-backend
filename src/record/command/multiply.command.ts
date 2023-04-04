import { Operation } from "../../operation/operation.entity";
import ICommand from "../../util/command.interface";

export default class MultiplyCommand implements ICommand {
    
    constructor(public values: number[], public operation: Operation) {}   

    execute(): number {
        this.validate()
        const result = this.values.reduce((total, num) => total * num, 1);
        return result;
    }

    validate(): void {
        if (this.values.length === 0) {
            throw new Error('Array must not be empty');
        }
    }
}