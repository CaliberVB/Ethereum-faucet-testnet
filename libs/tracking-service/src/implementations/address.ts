import Redis from 'ioredis';
import { ITrackingService } from '../interfaces';
import { Network } from '@config';

export function generateKey(network: Network, address: string): string {
  return `${network}|${address}`;
}
export const TTL_24_HOURS = 24 * 60 * 60;

export class AddressTrackingService implements ITrackingService {
  constructor(private readonly redis: Redis) {}

  async hasReceivedTokens(
    network: Network,
    address: string,
    minLayover: number = TTL_24_HOURS * 1000,
  ): Promise<boolean> {
    const key = generateKey(network, address);
    const timeString = await this.redis.get(key);
    if (!timeString) return false;

    const lastTransactionTime = new Date(timeString).getTime();
    const nowTime = new Date().getTime();
    return nowTime - lastTransactionTime < minLayover;
  }

  async recordTransaction(network: Network, address: string) {
    const data = new Date().toISOString();
    const key = generateKey(network, address);
    await this.redis.set(key, data, 'EX', TTL_24_HOURS);
  }
}
