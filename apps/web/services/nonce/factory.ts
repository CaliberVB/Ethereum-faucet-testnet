import { getAppConfig } from '@/config';
import { TimestampNonce } from './implementations/timestamp';
import { INonceService } from './interfaces';

export function getNonceService(): INonceService {
  const { nonceType } = getAppConfig();
  switch (nonceType) {
    case 'timestamp':
      return new TimestampNonce();
    default:
      return new TimestampNonce();
  }
}
