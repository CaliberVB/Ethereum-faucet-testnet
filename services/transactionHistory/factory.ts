import { Redis } from 'ioredis';
import { getAppConfig } from '@/config';

import { IpTransactionHistory } from './implementations/ip';
import { ITransactionHistoryService } from './interfaces';
import { AddressTransactionHistory } from './implementations/address';

export function getTransactionHistoryService(type: string): ITransactionHistoryService {
  const { redisUrl } = getAppConfig();
  const redis = new Redis(redisUrl);

  switch (type) {
    case 'ip':
      return new IpTransactionHistory(redis);
    default:
      return new AddressTransactionHistory(redis);
  }
}
