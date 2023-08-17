import Redis from 'ioredis';
import { ITrackingService } from '../interfaces';
import { Network } from '@config';
import { TTL_24_HOURS } from './address';

// @ts-ignore
export class IpTrackingService implements ITrackingService {
  constructor(private readonly redis: Redis) {}

  async hasReceivedTokens(network: Network, ipAddress: string, minLayover: number): Promise<boolean> {
    const data = await this.redis.get(network);
    if (!data) return false;
    const timeString = JSON.parse(data)[ipAddress];
    if (timeString === null) {
      return false;
    }
    const lastTransactionTime = new Date(timeString).getTime();
    const nowTime = new Date().getTime();

    return nowTime - lastTransactionTime < minLayover;
  }

  async recordTransaction(network: Network, ipAddress: string) {
    const nowTime = new Date().toISOString();
    const dataStored = {
      [ipAddress]: nowTime,
    };
    await this.redis.set(network, JSON.stringify(dataStored), 'EX', TTL_24_HOURS);
  }
}
