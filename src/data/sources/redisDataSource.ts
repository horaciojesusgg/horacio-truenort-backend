import { Redis } from "ioredis";

const RedisDataSource = () => {
    return new Redis({
      host: "localhost",
      port: 6379,
    });
}

export default RedisDataSource;