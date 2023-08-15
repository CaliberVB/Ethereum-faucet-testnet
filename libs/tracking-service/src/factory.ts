import { Redis } from 'ioredis';
import { getAppConfig } from '@config';

import { IpTrackingService } from './implementations/ip';
import { ITrackingService } from './interfaces';
import { AddressTrackingService } from './implementations/address';

export function getTrackingService(type: string): ITrackingService {
  const { redisUrl } = getAppConfig();
  const redis = new Redis(redisUrl);

  switch (type) {
    case 'ip':
      return new IpTrackingService(redis);
    default:
      return new AddressTrackingService(redis);
  }
}
