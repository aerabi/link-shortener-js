import { AppRepository } from './app.repository';
import { createClient, RedisClientType } from 'redis';

export class AppRepositoryRedis implements AppRepository {
  private readonly redisClient: RedisClientType;

  constructor() {
    const host = process.env.REDIS_HOST || 'redis';
    const port = +process.env.REDIS_PORT || 6379;
    this.redisClient = createClient({
      url: `redis://${host}:${port}`,
    });
    this.redisClient.on('connect', () => console.log('Redis connected'));
    this.redisClient.on('error', console.error);
  }

  get(hash: string): Promise<string> {
    return this.redisClient.get(hash);
  }

  async put(hash: string, url: string): Promise<void> {
    await this.redisClient.set(hash, url);
  }
}
