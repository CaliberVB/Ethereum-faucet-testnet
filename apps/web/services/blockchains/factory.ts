import { getBlockchainNetworkConfig } from '@/config';
import Ethereum from './ethereum';
import { IBlockchainService } from './interfaces';
import { WrongNetworkConfigError } from '@/errors';

export function getBlockchainService(networkName: string): IBlockchainService {
  const networkConfig = getBlockchainNetworkConfig(networkName);

  switch (networkName) {
    //EVM networks
    case 'sepolia':
    case 'goerli':
      return new Ethereum(networkConfig);
    default:
      throw new WrongNetworkConfigError();
  }
}
