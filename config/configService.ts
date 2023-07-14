import { IAppConfig, IBlockchainConfig } from "./interfaces";
import appConfig from "./appConfig";
import { WrongNetworkConfigError } from "../errors/WrongNetworkConfigError";

export function getAppConfig() : IAppConfig {
  return appConfig;
}

export function getBlockchainNetworkConfig(name: string) : IBlockchainConfig {
  const blockchainNetworks = appConfig.blockchainNetworks;
  if (!blockchainNetworks.hasOwnProperty(name)) {
    throw new WrongNetworkConfigError();
  }

  return blockchainNetworks[name];
}

export function getSupportedNetworks() : string[] {
  return Object.keys(appConfig.blockchainNetworks);
}