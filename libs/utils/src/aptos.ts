import { AptosClient } from 'aptos';
import { getAppConfig } from '@config';

export function getAptosClient() {
  return new AptosClient(getAppConfig().blockchainNetworks.aptos.providerUrl);
}
