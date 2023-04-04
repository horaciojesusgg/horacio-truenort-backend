import ICommand from "../../util/command.interface";

export default class MultiplyCommand implements ICommand {
    
    constructor(public values: number[]) {}   

    validate(): void {
        throw new Error("Method not implemented.");
    }
}