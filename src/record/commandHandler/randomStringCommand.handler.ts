import { autoInjectable } from "tsyringe";
import RecordRepository from "../record.repository";
import DivideCommand from "../command/divide.command";
import RandomStringCommand from "../command/randomString.command";

@autoInjectable()
export default class RandomStringCommandHandler {
    constructor(private readonly recordRepository: RecordRepository) {}

    public async handle(command: RandomStringCommand) {
        const response = await fetch('https://www.random.org/strings/?num=1&len=10&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new');
        
        console.log(response);
    }
}