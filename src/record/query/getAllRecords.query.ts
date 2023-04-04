import { autoInjectable, inject } from 'tsyringe';
import { Redis as RedisClient } from 'ioredis';

@autoInjectable()
export default class getAllRecordsQuery {
  constructor(@inject('RedisClient') private readonly redisClient: RedisClient) {}

  execute() {}
}
