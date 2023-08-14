import { Network, getAppConfig } from '@/config';

export const useFaucet = (network: Network) => {
  const networkConfigs = getAppConfig().blockchainNetworks[network];
  return {
    retrieveAmount: networkConfigs.defaultDailyAmount,
    nativeAsset: networkConfigs.nativeAsset,
  };
};
