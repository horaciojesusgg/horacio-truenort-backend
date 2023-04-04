import { autoInjectable } from "tsyringe";
import RedisService from "../data/redis.service";
import { Operation } from "../operation/operation.entity";
import ICommand from "../util/command.interface";
import RecordRepository from "./record.repository";

@autoInjectable()
export default class RecordCommandHandler {
    constructor(private readonly redisService: RedisService, private readonly recordRepository: RecordRepository) {}

    public async handle(command: ICommand) {
        const operationResult = command.execute();
        const userId = "";
        // command.operation.
        const calculatedUserBalance = this.calculateUserBalance();
        const record = await this.recordRepository.create({userId: "", operationId: command.operation.id, user_balance: calculatedUserBalance, operation_response: operationResult.toString(), amount: 1})
        await this.redisService.setRecord(record, userId)
    }

    private calculateUserBalance(): number {
        return 1;
    }
}
