import { FaucetContext } from '@/contexts';
import { Network, getAppConfig } from '@config';
import { useContext } from 'react';

export const useFaucet = (network: Network) => {
  const networkConfigs = getAppConfig().blockchainNetworks[network];
  const { isInsufficientFund, onSetIsInsufficientFund } = useContext(FaucetContext);
  return {
    retrieveAmount: networkConfigs.defaultDailyAmount,
    nativeAsset: networkConfigs.nativeAsset,
    isInsufficientFund,
    onSetIsInsufficientFund,
  };
};
