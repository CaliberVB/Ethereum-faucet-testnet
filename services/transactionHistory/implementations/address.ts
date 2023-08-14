import Redis from 'ioredis';
import { ITransactionHistoryService } from '../interfaces';
import { Network } from '@/config';
import { generateKey } from '@/utils';
// @ts-ignore
export class AddressTransactionHistory implements ITransactionHistoryService {
  constructor(private readonly redis: Redis) {}

  async hasReceivedTokens(network: Network, address: string, minLayover: number): Promise<boolean> {
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
    await this.redis.set(key, data);
  }
}
