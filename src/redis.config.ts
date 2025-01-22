import { createClient } from 'redis';
import Configuration from './config/index';

let redisClient: any;

export async function initializeRedis() {
  if (!redisClient) {
    const { redis_host, redis_port, redis_password, redis_user } = Configuration.redis_setup;

    const url = `redis://${redis_user}:${encodeURIComponent(redis_password)}@${redis_host}:${redis_port}`;
    redisClient = createClient({
      url
    });

    redisClient.on('error', (err: any) => console.log('Redis Client Error', err));

    try {
      await redisClient.connect();
      console.log('Redis client connected successfully');
    } catch (err) {
      console.error('Failed to connect to Redis:', err);
    }
  }
  return redisClient;
}

export { redisClient };
