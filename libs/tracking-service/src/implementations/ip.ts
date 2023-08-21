import Redis from 'ioredis';
import { ITrackingService } from '../interfaces';
import { Network } from '@config';
import { TTL_24_HOURS, generateKey } from './address';

// @ts-ignore
export class IpTrackingService implements ITrackingService {
  constructor(private readonly redis: Redis) {}

  async hasReceivedTokens(network: Network, ipAddress: string, minLayover: number): Promise<boolean> {
    const key = generateKey(network, ipAddress);

    const timeString = await this.redis.get(key);
    if (!timeString) return false;

    const lastTransactionTime = new Date(timeString).getTime();
    const nowTime = new Date().getTime();
    return nowTime - lastTransactionTime < minLayover;
  }

  async recordTransaction(network: Network, ipAddress: string) {
    const data = new Date().toISOString();
    const key = generateKey(network, ipAddress);
    await this.redis.set(key, data, 'EX', TTL_24_HOURS);
  }
}
