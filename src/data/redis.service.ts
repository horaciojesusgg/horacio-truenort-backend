import { autoInjectable, inject } from "tsyringe";
import { Redis as RedisClient } from "ioredis";
import { User } from "../user/user.entity";
import { Record } from "../record/record.entity";


@autoInjectable()
export default class RedisService {
    constructor(@inject("RedisClient") private readonly redisClient: RedisClient) {}

    public async setRecord(value: Record, userId: string) {
        const recordsKey = `records:${userId}`
        const redisCachedOperations = await this.redisClient.get(recordsKey);
        if (!redisCachedOperations) {
            console.log(redisCachedOperations)
            await this.redisClient.set(recordsKey, JSON.stringify({
                history: [value]
            }));
        } else {
            console.log(redisCachedOperations)
            const parsed = JSON.parse(redisCachedOperations);
            parsed.push(value);
            await this.redisClient.set('records', JSON.stringify({
                history: parsed
            }));
        }
    }


    public getRecord(key: string) {

    }
}