import { Network, getBlockchainNetworkConfig } from '@config';
import Ethereum from './ethereum';
import { IBlockchainService } from './interfaces';
import { WrongNetworkConfigError } from '@errors';

export function getBlockchainService(networkName: Network): IBlockchainService {
  const networkConfig = getBlockchainNetworkConfig(networkName);

  switch (networkName) {
    //EVM networks
    case 'sepolia':
    case 'goerli':
    case 'bnb':
    case 'arbitrum':
    case 'base':
    case 'mumbai':
    case 'optimism':
      return new Ethereum(networkConfig);
    default:
      throw new WrongNetworkConfigError();
  }
}
