import { getAppConfig } from '@config';

export function getSupportNetworks() {
  const { blockchainNetworks } = getAppConfig();
  return Object.keys(blockchainNetworks);
}
