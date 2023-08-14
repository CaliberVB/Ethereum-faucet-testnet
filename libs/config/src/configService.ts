import { IAppConfig, IBlockchainConfig, Network } from './interfaces';
import appConfig from './appConfig';
import { WrongNetworkConfigError } from '@errors';

export function getAppConfig(): IAppConfig {
  return appConfig;
}

export function getBlockchainNetworkConfig(name: Network): IBlockchainConfig {
  const blockchainNetworks = appConfig.blockchainNetworks;
  if (!blockchainNetworks.hasOwnProperty(name)) {
    throw new WrongNetworkConfigError();
  }

  return blockchainNetworks[name];
}

export function getSupportedNetworks(): string[] {
  return Object.keys(appConfig.blockchainNetworks);
}
